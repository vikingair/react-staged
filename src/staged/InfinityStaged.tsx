import React, { ReactNode, useRef } from 'react';
import { useArrangeAfterResize } from './useArrangeAfterResize';
import { useInitCssVars, SlideAnimation } from './css-vars';
import { StagedDraggable } from './StagedDraggable';
import { useAutoSlide } from './useAutoSlide';
import { useInfinitySlides } from './useInfinitySlides';
import { useInfinityPaging } from './useInfinityPaging';

type InfinityStagedProps = {
    children: ReactNode[];
    amount?: number;
    hideArrows?: boolean;
    autoSlide?: number;
    noDrag?: boolean;
    animation?: SlideAnimation;
};

export const InfinityStaged: React.FC<InfinityStagedProps> = ({
    children,
    amount = 1,
    hideArrows,
    autoSlide,
    noDrag,
    animation,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const stagedRef = useRef<HTMLDivElement | null>(null);
    useArrangeAfterResize(ref);
    useInitCssVars(ref, amount, animation);
    const [{ pos, paged }, prev, next] = useInfinityPaging(ref, children.length, amount, animation === 'none');
    const autoSlider = useAutoSlide(next, autoSlide);
    const slides = useInfinitySlides(children, amount, pos, paged);

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
