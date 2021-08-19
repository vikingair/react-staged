import { useCallback, useRef } from 'react';

export const useNopWhilePending = <T>(cb: (arg: T) => Promise<void>): ((arg: T) => void) => {
    const pending = useRef(false);
    const cbRef = useRef(cb);
    cbRef.current = cb;

    return useCallback((arg: T) => {
        if (!pending.current) {
            pending.current = true;
            cbRef.current(arg).then(() => (pending.current = false));
        }
    }, []);
};
