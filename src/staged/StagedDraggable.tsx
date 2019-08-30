import React, { ReactNode } from 'react';
import { StagedRef } from './css-vars';
import { useDragging } from './useDragging';
import { AutoSlider } from './useAutoSlide';

export type StagedDraggableProps = {
    outerRef: StagedRef;
    forwardRef: StagedRef;
    slides: ReactNode[];
    prev: () => void;
    next: () => void;
    autoSlider: AutoSlider;
    isLeft: boolean;
    isRight: boolean;
};

export const StagedDraggable: React.FC<StagedDraggableProps> = ({
    outerRef,
    forwardRef,
    slides,
    prev,
    next,
    autoSlider,
    isLeft,
    isRight,
}) => {
    const [onEnter, onMove, onLeave] = useDragging(outerRef, forwardRef, prev, next, autoSlider, isLeft, isRight);

    return (
        <div
            className="staged"
            ref={forwardRef}
            onMouseDown={onEnter}
            onTouchStart={onEnter}
            onTouchMove={onMove}
            onMouseMove={onMove}
            onTouchEnd={onLeave}
            onMouseUp={onLeave}
            onMouseLeave={onLeave}>
            {slides}
        </div>
    );
};
