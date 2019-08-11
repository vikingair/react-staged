import React, { ReactNode, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useArrangeAfterResize } from './useArrangeAfterResize';
import { useDragging } from './useDragging';
import { usePaging } from './usePaging';
import { modulo } from './util';
import { CssVars } from './css-vars';

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
    const [pos, prev, next] = usePaging(ref, children.length, amount);

    const [onEnter, onMove, onLeave] = useDragging(ref, stagedRef, prev, next);

    useLayoutEffect(() => {
        CssVars.amount(ref, amount);
    }, [amount]);

    const amounts = useMemo(() => [...Array(amount * 3)].map((_, i) => i - amount), [amount]);
    const slides = useMemo(() => amounts.map(i => children[modulo(pos + i, children.length)]), [
        children,
        amounts,
        pos,
    ]);

    useEffect(() => {
        if (autoSlide) {
            const id = setInterval(next, autoSlide);
            return () => clearInterval(id);
        }
    }, [autoSlide, next]);

    return (
        <div className="staged-outer" ref={ref}>
            {hideArrows || <div className="staged-left-nav" onClick={prev} />}
            {noDrag ? (
                <div className="staged" ref={stagedRef}>
                    {slides}
                </div>
            ) : (
                <div
                    className="staged"
                    ref={stagedRef}
                    onMouseDown={onEnter}
                    onTouchStart={onEnter}
                    onTouchMove={onMove}
                    onMouseMove={onMove}
                    onTouchEnd={onLeave}
                    onMouseUp={onLeave}>
                    {slides}
                </div>
            )}
            {hideArrows || <div className="staged-right-nav" onClick={next} />}
        </div>
    );
};
