import React, { ReactNode, useRef } from 'react';
import { useArrangeAfterResize } from './useArrangeAfterResize';
import { usePaging } from './usePaging';
import { useInitCssVars, SlideAnimation } from './css-vars';
import { StagedDraggable } from './StagedDraggable';
import { useAutoSlide } from './useAutoSlide';
import { useSlides } from './useSlides';

type StagedProps = {
    children: ReactNode[];
    amount?: number;
    hideArrows?: boolean;
    autoSlide?: number;
    noDrag?: boolean;
    infinity?: boolean;
    animation?: SlideAnimation;
};

export const Staged: React.FC<StagedProps> = ({
    children,
    amount = 1,
    hideArrows,
    autoSlide,
    noDrag,
    infinity,
    animation,
}) => {
    const infinityMode = infinity || !!autoSlide || children.length % amount !== 0;
    const ref = useRef<HTMLDivElement | null>(null);
    const stagedRef = useRef<HTMLDivElement | null>(null);
    useArrangeAfterResize(ref);
    useInitCssVars(ref, amount, animation);
    const [{ pos, paged }, prev, next] = usePaging(ref, children.length, amount, infinityMode, animation === 'none');
    const autoSlider = useAutoSlide(next, autoSlide);
    const slides = useSlides(children, amount, pos, paged);
    const isLeft: boolean = !infinityMode && pos === 0;
    const isRight: boolean = !infinityMode && pos >= children.length - amount;

    return (
        <div className="staged-outer" ref={ref}>
            {hideArrows || isLeft || <div className="staged-left-nav" onClick={prev} />}
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
                    isLeft={isLeft}
                    isRight={isRight}
                />
            )}
            {hideArrows || isRight || <div className="staged-right-nav" onClick={next} />}
        </div>
    );
};
