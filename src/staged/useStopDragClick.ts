import { MutableRefObject, useEffect, useRef } from 'react';
import { StagedRef } from './css-vars';

export const useStopDragClick = (ref: StagedRef): MutableRefObject<boolean> => {
    const stopClick = useRef<boolean>(false);

    useEffect(() => {
        const { current } = ref;

        const stopDraggedClick = (e: Event) => {
            if (stopClick.current) e.stopPropagation();
        };
        if (current) {
            current.addEventListener('click', stopDraggedClick, true);
            return () => current.removeEventListener('click', stopDraggedClick, true);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return stopClick;
};
