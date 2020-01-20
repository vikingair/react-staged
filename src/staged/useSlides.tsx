import React, { ReactNode, useMemo } from 'react';
import { useSlideAmounts } from './useSlideAmounts';

export const useSlides = (children: ReactNode[], amount: number, pos: number): ReactNode[] => {
    const amounts = useSlideAmounts(amount);
    return useMemo(
        () =>
            amounts.map(i => (
                <div className="staged-child" key={pos + i}>
                    {children[pos + i] || <div />}
                </div>
            )),
        [children, amounts, pos]
    );
};
