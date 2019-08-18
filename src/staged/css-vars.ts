import { MutableRefObject, useLayoutEffect } from 'react';

export type StagedRef = MutableRefObject<HTMLDivElement | null>;
export const ANIMATION_TIME = 0.5; // in seconds

enum CssVar {
    TRANSITION_DURATION = '--s-trans-dur',
    TRANSITION_ANIMATION = '--s-trans-animation',
    TRANSFORM_X = '--s-transform-x',
    AMOUNT = '--s-amount',
}

const _set = ({ current }: StagedRef, name: CssVar, value: string): void => {
    if (current) {
        current.style.setProperty(name, value);
    }
};

enum XFactor {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2,
}

const _setX = ({ current }: StagedRef, value: number = 0, factor: XFactor = XFactor.CENTER): void => {
    if (current) {
        current.style.setProperty(CssVar.TRANSFORM_X, `${-current.clientWidth * factor + value}px`);
    }
};
const _transitionOne = (ref: StagedRef, xFactor: XFactor) => {
    _set(ref, CssVar.TRANSITION_DURATION, `${ANIMATION_TIME}s`);
    _setX(ref, 0, xFactor);
};

const prev = (ref: StagedRef) => _transitionOne(ref, XFactor.LEFT);
const center = (ref: StagedRef) => _transitionOne(ref, XFactor.CENTER);
const next = (ref: StagedRef) => _transitionOne(ref, XFactor.RIGHT);
const update = (ref: StagedRef, value: number) => _setX(ref, value);
const amount = (ref: StagedRef, value: number) => _set(ref, CssVar.AMOUNT, String(value));

const finish = (ref: StagedRef) => {
    _set(ref, CssVar.TRANSITION_DURATION, '0');
    _setX(ref, 0, XFactor.CENTER);
};

const transition = (ref: StagedRef, trans: (ref: StagedRef) => void): Promise<void> => {
    trans(ref);
    return new Promise(resolve => {
        setTimeout(() => {
            finish(ref);
            resolve();
        }, 1000 * ANIMATION_TIME);
    });
};

export const useInitCssVars = (ref: StagedRef, amount: number) => {
    useLayoutEffect(() => {
        CssVars.amount(ref, amount);
    }, [amount]); // eslint-disable-line react-hooks/exhaustive-deps
};

export const CssVars = { prev, next, center, finish, update, transition, amount };
