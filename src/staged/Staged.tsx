import React, { ReactNode, useRef } from 'react';
import { useArrangeAfterResize } from './useArrangeAfterResize';
import { usePaging } from './usePaging';
import { useInitCssVars, SlideAnimation } from './css-vars';
import { StagedDraggable } from './StagedDraggable';
import { useSlides } from './useSlides';
import { useSwipeListener } from './useSwipeListener';

type StagedProps = {
    children: ReactNode[];
    amount?: number;
    hideArrows?: boolean;
    noDrag?: boolean;
    animation?: SlideAnimation;
    onSwipe?: (index: number) => void;
};

export const Staged: React.FC<StagedProps> = ({ children, amount = 1, hideArrows, noDrag, animation, onSwipe }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const stagedRef = useRef<HTMLDivElement | null>(null);
    useArrangeAfterResize(ref);
    useInitCssVars(ref, amount, animation);
    const [pos, prev, next, isLeft, isRight] = usePaging(ref, children.length, amount, animation === 'none');
    useSwipeListener(pos, onSwipe);
    const slides = useSlides(children, amount, pos);

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
                    isLeft={isLeft}
                    isRight={isRight}
                />
            )}
            {hideArrows || isRight || <div className="staged-right-nav" onClick={next} />}
        </div>
    );
};
