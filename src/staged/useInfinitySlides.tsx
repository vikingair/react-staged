import React, { ReactNode, useMemo } from 'react';
import { modulo } from './util';
import { useSlideAmounts } from './useSlideAmounts';

export const useInfinitySlides = (children: ReactNode[], amount: number, pos: number, paged: number): ReactNode[] => {
    const amounts = useSlideAmounts(amount);
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
