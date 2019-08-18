import { CssVars, StagedRef } from './css-vars';
import { MouseEvent, TouchEvent, useCallback, useRef } from 'react';
import { useStopDragClick } from './useStopDragClick';
import { AutoSlider } from './useAutoSlide';

const DRAG_INTENT_RATE = 0.1; // in [0, 1]

type TouchOrMouseEvent = TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>;
const pageX = (e: TouchOrMouseEvent): number => ('touches' in e ? (e.touches[0] as any).pageX : e.pageX);

type TouchOrMouseCb = (e: TouchOrMouseEvent) => void;
type UseDraggingReturnType = [TouchOrMouseCb, TouchOrMouseCb, TouchOrMouseCb];

export const useDragging = (
    ref: StagedRef,
    stagedRef: StagedRef,
    prev: () => void,
    next: () => void,
    autoSlider: AutoSlider
): UseDraggingReturnType => {
    const stopClick = useStopDragClick(stagedRef);
    const lastEnteredX = useRef<number | void>(undefined);
    const draggedX = useRef<number>(0);

    const onEnter = useCallback(
        e => {
            autoSlider.stop();
            lastEnteredX.current = pageX(e);
        },
        [autoSlider]
    );

    const onMove = useCallback(e => {
        const currentX = lastEnteredX.current;
        if (currentX !== undefined) {
            draggedX.current = pageX(e) - currentX;
            CssVars.update(ref, draggedX.current);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onLeave = useCallback(() => {
        const { current } = ref;
        const currentX = lastEnteredX.current;
        const totalDraggedX = draggedX.current;
        if (current && currentX !== undefined) {
            // only inside here we need to perform any actions
            autoSlider.start();
            lastEnteredX.current = undefined;
            draggedX.current = 0;
            stopClick.current = !!totalDraggedX;
            const wasDragIntent = Math.abs(totalDraggedX) / current.clientWidth > DRAG_INTENT_RATE;
            if (wasDragIntent) {
                return totalDraggedX < 0 ? next() : prev();
            }
            CssVars.transition(ref, CssVars.center);
        }
    }, [next, prev, stopClick, autoSlider]); // eslint-disable-line react-hooks/exhaustive-deps

    return [onEnter, onMove, onLeave];
};
