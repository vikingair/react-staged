import React, { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import { useArrangeAfterResize } from './useArrangeAfterResize';
import { useInitCssVars, SlideAnimation } from './css-vars';
import { StagedDraggable } from './StagedDraggable';
import { useAutoSlide } from './useAutoSlide';
import { useInfinitySlides } from './useInfinitySlides';
import { useInfinityPaging } from './useInfinityPaging';
import { OnSwipe } from './types';
import { StagedRef } from './useStaged';
import { classNames } from './util';

type InfinityStagedProps = {
    children: ReactNode[];
    amount?: number;
    hideArrows?: boolean;
    autoSlide?: number;
    noDrag?: boolean;
    animation?: SlideAnimation;
    onSwipe?: OnSwipe;
    className?: string;
};

export const InfinityStaged = forwardRef<StagedRef, InfinityStagedProps>(
    ({ children, amount = 1, hideArrows, autoSlide, noDrag, animation, onSwipe, className }, forwardedRef) => {
        const ref = useRef<HTMLDivElement | null>(null);
        const stagedRef = useRef<HTMLDivElement | null>(null);
        useArrangeAfterResize(ref);
        useInitCssVars(ref, amount, animation);
        const [{ pos, paged }, prev, next] = useInfinityPaging(
            ref,
            children.length,
            amount,
            animation === 'none',
            onSwipe
        );
        // useSwipeListener(pos, onSwipe);
        const autoSlider = useAutoSlide(next, autoSlide);
        const slides = useInfinitySlides(children, amount, pos, paged);

        useImperativeHandle(forwardedRef, () => ({ prev, next }), []); // eslint-disable-line react-hooks/exhaustive-deps

        return (
            <div className={classNames('staged-outer', className)} ref={ref}>
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
    }
);
