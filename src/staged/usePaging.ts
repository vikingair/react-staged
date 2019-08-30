import { useCallback, useState, useRef } from 'react';
import { CssVars, StagedRef } from './css-vars';
import { modulo } from './util';

type UsePagingReturnType = [{ pos: number, paged: number }, () => void, () => void];

export const usePaging = (ref: StagedRef, length: number, amount: number): UsePagingReturnType => {
    const [state, setState] = useState({ pos: 0, paged: 0 });

    const page = useCallback(
        (factor: -1 | 1) => {
            CssVars.transition(ref, factor === 1 ? CssVars.next : CssVars.prev).then(() => {
                setState(({ pos, paged }) => ({ pos: modulo(pos + factor * amount, length), paged: paged + factor }));
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
