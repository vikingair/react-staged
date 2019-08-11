import { useCallback, useState } from 'react';
import { CssVars, StagedRef } from './css-vars';
import { modulo } from './util';

type UsePagingReturnType = [number, () => void, () => void];

export const usePaging = (ref: StagedRef, length: number, amount: number): UsePagingReturnType => {
    const [pos, setPos] = useState(0);

    const prev = useCallback(() => {
        CssVars.transition(ref, CssVars.prev).then(() => setPos(p => modulo(p - amount, length)));
    }, [length]); // eslint-disable-line react-hooks/exhaustive-deps

    const next = useCallback(() => {
        CssVars.transition(ref, CssVars.next).then(() => setPos(p => modulo(p + amount, length)));
    }, [length, amount]); // eslint-disable-line react-hooks/exhaustive-deps

    return [pos, prev, next];
};
