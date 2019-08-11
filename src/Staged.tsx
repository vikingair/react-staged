import React, {
    MouseEvent,
    MutableRefObject,
    ReactNode,
    TouchEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

type StagedProps = { children: ReactNode[] };
type StagedRef = MutableRefObject<HTMLDivElement | null>;

const modulo = (num: number, base: number) => ((num % base) + base) % base;

const ANIMATION_TIME = 0.5; // in seconds
const DRAG_INTENT_RATE = 0.1; // in [0, 1]

enum CssVar {
    TRANSITION_DURATION = '--s-trans-dur',
    TRANSITION_ANIMATION = '--s-trans-animation',
    TRANSFORM_X = '--s-transform-x',
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
        console.log();
        current.style.setProperty(CssVar.TRANSFORM_X, `${-current.clientWidth * factor + value}px`);
    }
};
const _transitionOne = (ref: StagedRef, xFactor: XFactor) => {
    _set(ref, CssVar.TRANSITION_DURATION, `${ANIMATION_TIME}s`);
    _setX(ref, 0, xFactor);
};

const transitionPrev = (ref: StagedRef) => _transitionOne(ref, XFactor.LEFT);
const transitionNext = (ref: StagedRef) => _transitionOne(ref, XFactor.RIGHT);

const finishTransition = (ref: StagedRef) => {
    _set(ref, CssVar.TRANSITION_DURATION, '0');
    _setX(ref, 0, XFactor.CENTER);
};

const transitionAndLogic = (ref: StagedRef, trans: (ref: StagedRef) => void, logic: () => void): void => {
    trans(ref);
    setTimeout(() => {
        finishTransition(ref);
        logic();
    }, 1000 * ANIMATION_TIME);
};

const pageX = (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>): number =>
    'touches' in e ? (e.touches[0] as any).pageX : e.pageX;

export const Staged: React.FC<StagedProps> = ({ children }) => {
    const [pos, setPos] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);
    const stagedRef = useRef<HTMLDivElement | null>(null);
    const lastEnteredX = useRef<number | void>(undefined);
    const draggedX = useRef<number>(0);
    const stopClick = useRef<boolean>(false);

    const length = children.length;

    const onPrev = useCallback(() => {
        transitionAndLogic(ref, transitionPrev, () => setPos(p => (p === 0 ? length - 1 : p - 1)));
    }, [length]);

    const onNext = useCallback(() => {
        transitionAndLogic(ref, transitionNext, () => setPos(p => (p === length - 1 ? 0 : p + 1)));
    }, [length]);

    const onEnter = useCallback(e => {
        lastEnteredX.current = pageX(e);
    }, []);

    const onMove = useCallback(e => {
        const currentX = lastEnteredX.current;
        if (currentX !== undefined) {
            draggedX.current = pageX(e) - currentX;
            _setX(ref, draggedX.current);
        }
    }, []);

    const onLeave = useCallback(() => {
        const { current } = ref;
        const currentX = lastEnteredX.current;
        const totalDraggedX = draggedX.current;
        if (current && currentX !== undefined) {
            lastEnteredX.current = undefined;
            draggedX.current = 0;
            stopClick.current = !!totalDraggedX;
            const wasDragIntent = Math.abs(totalDraggedX) / current.clientWidth > DRAG_INTENT_RATE;
            if (wasDragIntent) {
                return totalDraggedX < 0 ? onNext() : onPrev();
            }
            transitionAndLogic(ref, () => _transitionOne(ref, XFactor.CENTER), () => {});
        }
    }, [onNext, onPrev]);

    useEffect(() => {
        const { current } = stagedRef;
        const stopDraggedClick = (e: Event) => {
            if (stopClick.current) e.stopPropagation();
        };
        if (current) {
            current.addEventListener('click', stopDraggedClick, true);
            return () => current.removeEventListener('click', stopDraggedClick, true);
        }
    }, []);

    useEffect(() => {
        const rearrangeAfterResize = () => finishTransition(ref);
        window.addEventListener('resize', rearrangeAfterResize);
        return () => window.removeEventListener('resize', rearrangeAfterResize);
    }, []);

    return (
        <div className="staged-outer" ref={ref}>
            <div className="staged-left-nav" onClick={onPrev} />
            <div
                className="staged"
                ref={stagedRef}
                onMouseDown={onEnter}
                onTouchStart={onEnter}
                onTouchMove={onMove}
                onMouseMove={onMove}
                onTouchEnd={onLeave}
                onMouseUp={onLeave}>
                {children[modulo(pos - 1, length)]}
                {children[pos]}
                {children[modulo(pos + 1, length)]}
            </div>
            <div className="staged-right-nav" onClick={onNext} />
        </div>
    );
};
