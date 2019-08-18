import React, { ReactNode, useRef } from 'react';
import { useArrangeAfterResize } from './useArrangeAfterResize';
import { usePaging } from './usePaging';
import { useInitCssVars } from './css-vars';
import { StagedDraggable } from './StagedDraggable';
import { useAutoSlide } from './useAutoSlide';
import { useSlides } from './useSlides';

type StagedProps = {
    children: ReactNode[];
    amount?: number;
    hideArrows?: boolean;
    autoSlide?: number;
    noDrag?: boolean;
};

export const Staged: React.FC<StagedProps> = ({ children, amount = 1, hideArrows, autoSlide, noDrag }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const stagedRef = useRef<HTMLDivElement | null>(null);
    useArrangeAfterResize(ref);
    useInitCssVars(ref, amount);
    const [pos, prev, next] = usePaging(ref, children.length, amount);
    const autoSlider = useAutoSlide(next, autoSlide);
    const slides = useSlides(children, amount, pos);

    return (
        <div className="staged-outer" ref={ref}>
            {hideArrows || <div className="staged-left-nav" onClick={prev} />}
            {noDrag ? (
                <div className="staged" ref={stagedRef}>
                    {slides}
                </div>
            ) : (
                <StagedDraggable
                    outerRef={ref}
                    forwardRef={stagedRef}
                    prev={prev}
                    next={next}
                    slides={slides}
                    autoSlider={autoSlider}
                />
            )}
            {hideArrows || <div className="staged-right-nav" onClick={next} />}
        </div>
    );
};
