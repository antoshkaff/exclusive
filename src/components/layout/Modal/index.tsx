'use client';

import { ReactNode, useEffect, useRef, useId } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import Button from '@/components/ui/Button';
import CrossIcon from '@/shared/icons/CrossIcon';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { ModalTypes } from '@/context/ModalContext';
import successIcon from '@/assets/success.svg';
import warningIcon from '@/assets/warning.svg';
import errorIcon from '@/assets/error.svg';

type ModalProps = {
    children: ReactNode;
    title?: string;
    type: ModalTypes;
    onClose: () => void;
    action?: () => void;
};

const BACKDROP = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.18, ease: 'easeOut' },
};

const DIALOG = {
    initial: { opacity: 0, scale: 0.96, y: -8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: -8 },
    transition: { duration: 0.22, ease: 'easeOut' },
};

export const Modal = ({
    children,
    type,
    title,
    onClose,
    action,
}: ModalProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const titleId = useId();

    useOutsideClick(ref, onClose);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    useEffect(() => {
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = overflow;
        };
    }, []);

    const ICONS: Record<ModalTypes, string> = {
        success: successIcon.src,
        error: errorIcon.src,
        warning: warningIcon.src,
    } as const;

    const handleClose = () => {
        onClose();
        if (action) action();
    };

    return (
        <motion.div
            className={styles.container}
            variants={BACKDROP}
            initial="initial"
            animate="animate"
            exit="exit"
            aria-hidden={false}
            onClick={handleClose}
        >
            <motion.div
                className={styles.modal}
                variants={DIALOG}
                initial="initial"
                animate="animate"
                exit="exit"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onClick={(e) => e.stopPropagation()}
                ref={ref}
            >
                <Button
                    variant="transparent"
                    className={styles.modal__close}
                    aria-label="Close dialog"
                    onClick={handleClose}
                >
                    <CrossIcon />
                </Button>

                <div className={styles.modal__header}>
                    <img
                        className={styles.modal__icon}
                        src={ICONS[type]}
                        alt="Icon"
                    />
                    <h2 id={titleId}>{title}</h2>
                </div>

                <div className={styles.modal__body}>{children}</div>
                <div className={styles.modal__footer}>
                    <Button
                        variant={'accent'}
                        size={'md'}
                        onClick={handleClose}
                    >
                        OK
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Modal;
