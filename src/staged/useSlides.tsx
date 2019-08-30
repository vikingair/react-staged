import React, { ReactNode, useMemo, Fragment } from 'react';
import { modulo } from './util';

export const useSlides = (children: ReactNode[], amount: number, pos: number, paged: number): ReactNode[] => {
    const amounts = useMemo(() => [...Array(amount * 3)].map((_, i) => i - amount), [amount]);
    return useMemo(
        () =>
            amounts.map(i => (
                <Fragment key={modulo(paged * amount + i, amount * 3)}>
                    {children[modulo(pos + i, children.length)]}
                </Fragment>
            )),
        [children, amounts, pos, amount, paged]
    );
};
