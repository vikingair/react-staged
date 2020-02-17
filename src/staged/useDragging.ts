import { CssVars, _StagedRef } from './css-vars';
import { MouseEvent, TouchEvent, useCallback, useRef } from 'react';
import { useStopDragClick } from './useStopDragClick';
import { AutoSlider, NoopAutoSlider } from './useAutoSlide';

const DRAG_INTENT_RATE = 0.1; // in [0, 1]

type TouchOrMouseEvent = TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>;
const pageX = (e: TouchOrMouseEvent): number => ('touches' in e ? (e.touches[0] as any).pageX : e.pageX);

type TouchOrMouseCb = (e: TouchOrMouseEvent) => void;
type UseDraggingReturnType = [TouchOrMouseCb, TouchOrMouseCb, TouchOrMouseCb];

export const useDragging = (
    ref: _StagedRef,
    stagedRef: _StagedRef,
    prev: () => void,
    next: () => void,
    autoSlider: AutoSlider = NoopAutoSlider,
    isLeft?: boolean,
    isRight?: boolean
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

    const onMove = useCallback(
        e => {
            const currentX = lastEnteredX.current;
            if (currentX !== undefined) {
                draggedX.current = pageX(e) - currentX;
                if (isLeft && draggedX.current > 0) return;
                if (isRight && draggedX.current < 0) return;
                CssVars.update(ref, draggedX.current);
            }
        },
        [isLeft, isRight] // eslint-disable-line react-hooks/exhaustive-deps
    );

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
                if (isLeft && totalDraggedX > 0) return;
                if (isRight && totalDraggedX < 0) return;
                return totalDraggedX < 0 ? next() : prev();
            }
            // we make the back transition always with animation
            // because dragging itself was kind of an animation
            CssVars.transition(ref, 0, false);
        }
    }, [next, prev, stopClick, autoSlider, isLeft, isRight]); // eslint-disable-line react-hooks/exhaustive-deps

    return [onEnter, onMove, onLeave];
};
