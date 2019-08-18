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
};

export const StagedDraggable: React.FC<StagedDraggableProps> = ({
    outerRef,
    forwardRef,
    slides,
    prev,
    next,
    autoSlider,
}) => {
    const [onEnter, onMove, onLeave] = useDragging(outerRef, forwardRef, prev, next, autoSlider);

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
