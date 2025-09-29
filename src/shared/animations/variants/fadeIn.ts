import { Variants } from 'motion-dom';

export const FADEIN_VARIANTS: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, x: 10 },
};
