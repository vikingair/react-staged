import { useEffect, useRef } from 'react';

export const useSwipeListener = (pos: number, onSwipe?: (pos: number) => void) => {
    const ref = useRef(onSwipe);
    ref.current = onSwipe;
    const lastPos = useRef(pos);

    useEffect(() => {
        if (pos !== lastPos.current) {
            lastPos.current = pos;
            ref.current && ref.current(pos);
        }
    }, [pos]);
};
