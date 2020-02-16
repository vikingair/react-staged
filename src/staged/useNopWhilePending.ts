import { useRef } from 'react';

export const useNopWhilePending = <T>(cb: (arg: T) => Promise<void>): ((arg: T) => void) => {
    const pending = useRef(false);

    return (arg: T) => {
        if (!pending.current) {
            pending.current = true;
            cb(arg).then(() => (pending.current = false));
        }
    };
};
