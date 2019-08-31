import { useCallback, useState, useRef, useEffect } from 'react';
import { CssVars, StagedRef } from './css-vars';
import { modulo } from './util';

type UsePagingReturnType = [{ pos: number; paged: number }, () => void, () => void];

export const usePaging = (
    ref: StagedRef,
    length: number,
    amount: number,
    infinityMode: boolean,
    noAnimation: boolean
): UsePagingReturnType => {
    const [state, setState] = useState({ pos: 0, paged: 0 });

    useEffect(() => {
        if (!infinityMode) {
            setState(({ pos, paged }) => ({ paged, pos: Math.floor(pos / amount) * amount }));
        }
    }, [amount, infinityMode]);

    const page = useCallback(
        (factor: -1 | 1) => {
            const transition = noAnimation
                ? Promise.resolve()
                : CssVars.transition(ref, factor === 1 ? CssVars.next : CssVars.prev);
            transition.then(() => {
                setState(({ pos, paged }) => ({ pos: modulo(pos + factor * amount, length), paged: paged + factor }));
                noAnimation && CssVars.finish(ref);
            });
        },
        [length, amount] // eslint-disable-line react-hooks/exhaustive-deps
    );
    const pageRef = useRef(page);
    pageRef.current = page;

    const prev = useCallback(() => pageRef.current(-1), []);
    const next = useCallback(() => pageRef.current(1), []);

    return [state, prev, next];
};
