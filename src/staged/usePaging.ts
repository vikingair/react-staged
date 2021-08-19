import { useCallback, useState, useEffect } from 'react';
import { CssVars, _StagedRef } from './css-vars';
import { useNopWhilePending } from './useNopWhilePending';
import { OnSwipe } from './types';

type UsePagingReturnType = [number, () => void, () => void, boolean, boolean];

export const usePaging = (
    ref: _StagedRef,
    length: number,
    amount: number,
    noAnimation: boolean,
    onSwipe?: OnSwipe
): UsePagingReturnType => {
    const [pos, setPos] = useState(0);
    const isLeft = pos === 0;
    const limit = Math.max(0, length - amount);
    const isRight = pos >= limit;

    useEffect(() => {
        if (pos > limit) setPos(limit);
    }, [amount, pos, limit]);

    const page = useNopWhilePending((factor: -1 | 1) => {
        const nextPos = factor === 1 ? Math.min(limit, pos + amount) : Math.max(0, pos - amount);
        onSwipe?.({ pos: nextPos, diff: nextPos - pos, direction: factor });
        const eFactor = (factor * Math.abs(nextPos - pos)) / amount;
        return CssVars.transition(ref, eFactor, noAnimation).then(() => setPos(nextPos));
    });

    const prev = useCallback(() => page(-1), []); // eslint-disable-line react-hooks/exhaustive-deps
    const next = useCallback(() => page(1), []); // eslint-disable-line react-hooks/exhaustive-deps

    return [pos, prev, next, isLeft, isRight];
};
