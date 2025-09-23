'use client';

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FADEIN_VARIANTS } from '@/shared/animations/variants/fadeIn';
import { TRANSITIONS } from '@/shared/animations/transitions';

export default function Template({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                style={{ minHeight: 'inherit' }}
                key={pathname}
                variants={FADEIN_VARIANTS}
                initial="initial"
                animate="animate"
                exit={'exit'}
                transition={TRANSITIONS.NORMAL}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
