import { useEffect, useMemo } from 'react';

export type AutoSlider = { start: () => void; stop: () => void };
export const NoopAutoSlider = { start: () => {}, stop: () => {} };
const noTimer: NodeJS.Timeout = 0 as any;
const createAutoSlider = (next: () => void, autoSlide?: number): AutoSlider => {
    let id: NodeJS.Timeout = noTimer;
    if (!autoSlide) return NoopAutoSlider;
    else
        return {
            start: () => {
                if (!id) {
                    id = setInterval(next, autoSlide);
                }
            },
            stop: () => {
                clearInterval(id);
                id = noTimer;
            },
        };
};

export const useAutoSlide = (next: () => void, autoSlide?: number): AutoSlider => {
    const autoSlider = useMemo(() => createAutoSlider(next, autoSlide), [next, autoSlide]);
    useEffect(() => {
        autoSlider.start();
        return autoSlider.stop;
    }, [autoSlider]);
    return autoSlider;
};
