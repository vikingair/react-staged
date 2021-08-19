import { useEffect } from 'react';
import { CssVars, _StagedRef } from './css-vars';

export const useArrangeAfterResize = (ref: _StagedRef) => {
    useEffect(() => {
        const rearrangeAfterResize = new ResizeObserver(() => CssVars.finish(ref));
        rearrangeAfterResize.observe(ref.current!);
        return rearrangeAfterResize.disconnect;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
