import { useEffect } from 'react';
import { CssVars, StagedRef } from './css-vars';

export const useArrangeAfterResize = (ref: StagedRef) => {
    useEffect(() => {
        const rearrangeAfterResize = () => CssVars.finish(ref);
        window.addEventListener('resize', rearrangeAfterResize);
        return () => window.removeEventListener('resize', rearrangeAfterResize);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
