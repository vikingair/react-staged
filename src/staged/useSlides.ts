import { ReactNode, useMemo } from 'react';
import { modulo } from './util';

export const useSlides = (children: ReactNode[], amount: number, pos: number): ReactNode[] => {
    const amounts = useMemo(() => [...Array(amount * 3)].map((_, i) => i - amount), [amount]);
    return useMemo(() => amounts.map(i => children[modulo(pos + i, children.length)]), [children, amounts, pos]);
};
