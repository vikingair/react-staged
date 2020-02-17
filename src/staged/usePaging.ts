import { useCallback, useState, useRef, useEffect } from 'react';
import { CssVars, _StagedRef } from './css-vars';
import { useNopWhilePending } from './useNopWhilePending';

type UsePagingReturnType = [number, () => void, () => void, boolean, boolean];

export const usePaging = (
    ref: _StagedRef,
    length: number,
    amount: number,
    noAnimation: boolean
): UsePagingReturnType => {
    const [pos, setPos] = useState(0);
    const isLeft = pos === 0;
    const limit = Math.max(0, length - amount);
    const isRight = pos >= limit;

    useEffect(() => {
        if (pos > limit) setPos(limit);
    }, [amount, pos, limit]);

    const page = useNopWhilePending(
        useCallback(
            (factor: -1 | 1) => {
                const nextPos = factor === 1 ? Math.min(limit, pos + amount) : Math.max(0, pos - amount);
                const eFactor = (factor * Math.abs(nextPos - pos)) / amount;
                return CssVars.transition(ref, eFactor, noAnimation).then(() => setPos(nextPos));
            },
            [noAnimation, amount, length, pos, length, limit] // eslint-disable-line react-hooks/exhaustive-deps
        )
    );
    const pageRef = useRef(page);
    pageRef.current = page;

    const prev = useCallback(() => pageRef.current(-1), []);
    const next = useCallback(() => pageRef.current(1), []);

    return [pos, prev, next, isLeft, isRight];
};
