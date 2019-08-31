import React, { ReactNode, useMemo } from 'react';
import { modulo } from './util';

export const useSlides = (children: ReactNode[], amount: number, pos: number, paged: number): ReactNode[] => {
    const amounts = useMemo(() => [...Array(amount * 3)].map((_, i) => i - amount), [amount]);
    return useMemo(
        () =>
            amounts.map(i => (
                <div className="staged-child" key={modulo(paged * amount + i, amount * 3)}>
                    {children[modulo(pos + i, children.length)]}
                </div>
            )),
        [children, amounts, pos, amount, paged]
    );
};
