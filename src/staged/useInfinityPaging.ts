import { useCallback, useState } from 'react';
import { CssVars, _StagedRef } from './css-vars';
import { modulo } from './util';
import { useNopWhilePending } from './useNopWhilePending';
import { OnSwipe } from './types';

type UseInfinityPagingReturnType = [{ pos: number; paged: number }, () => void, () => void];

export const useInfinityPaging = (
    ref: _StagedRef,
    length: number,
    amount: number,
    noAnimation: boolean,
    onSwipe?: OnSwipe
): UseInfinityPagingReturnType => {
    const [state, setState] = useState({ pos: 0, paged: 0 });

    const page = useNopWhilePending((factor: -1 | 1) => {
        const { pos, paged } = state;
        const nextPos = modulo(pos + factor * amount, length);
        onSwipe?.({ pos: nextPos, diff: nextPos - pos, direction: factor });
        return CssVars.transition(ref, factor, noAnimation).then(() =>
            setState({ pos: nextPos, paged: paged + factor })
        );
    });

    const prev = useCallback(() => page(-1), []); // eslint-disable-line react-hooks/exhaustive-deps
    const next = useCallback(() => page(1), []); // eslint-disable-line react-hooks/exhaustive-deps

    return [state, prev, next];
};
