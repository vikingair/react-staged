import { useMemo } from 'react';

export const useSlideAmounts = (amount: number): number[] =>
    useMemo(
        () =>
            Array(amount * 3)
                .fill(undefined)
                .map((_, i) => i - amount),
        [amount]
    );
