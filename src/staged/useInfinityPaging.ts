import { useCallback, useState, useRef } from 'react';
import { CssVars, StagedRef } from './css-vars';
import { modulo } from './util';
import { useNopWhilePending } from './useNopWhilePending';

type UseInfinityPagingReturnType = [{ pos: number; paged: number }, () => void, () => void];

export const useInfinityPaging = (
    ref: StagedRef,
    length: number,
    amount: number,
    noAnimation: boolean
): UseInfinityPagingReturnType => {
    const [state, setState] = useState({ pos: 0, paged: 0 });

    const page = useNopWhilePending(
        useCallback(
            (factor: -1 | 1) =>
                CssVars.transition(ref, factor, noAnimation).then(() =>
                    setState(({ pos, paged }) => ({
                        pos: modulo(pos + factor * amount, length),
                        paged: paged + factor,
                    }))
                ),
            [noAnimation, amount, length] // eslint-disable-line react-hooks/exhaustive-deps
        )
    );
    const pageRef = useRef(page);
    pageRef.current = page;

    const prev = useCallback(() => pageRef.current(-1), []);
    const next = useCallback(() => pageRef.current(1), []);

    return [state, prev, next];
};
