export const modulo = (num: number, base: number) => ((num % base) + base) % base;
export const classNames = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ') || undefined;
