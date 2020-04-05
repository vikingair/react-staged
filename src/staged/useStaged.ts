import { MutableRefObject, useRef } from 'react';

export type StagedRef = { prev: () => void; next: () => void };

const initial: StagedRef = { prev: () => {}, next: () => {} };

export const useStaged = (): MutableRefObject<StagedRef> => useRef(initial);
