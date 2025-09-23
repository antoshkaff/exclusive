import { Variants } from 'motion-dom';
import { TRANSITIONS } from '@/shared/animations/transitions';

export const underlineVariants: Variants = {
    initial: { width: 0 },
    animate: { width: '100%' },
    exit: { width: 0 },
    transition: TRANSITIONS.FAST,
};
