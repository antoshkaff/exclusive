'use client';
import styles from './styles.module.scss';
import { useAuthActions, useAuthState } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import UserIcon from '@/shared/icons/UserIcon';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/config/routes.config';
import MallbagIcon from '@/shared/icons/MallbagIcon';
import LogoutIcon from '@/shared/icons/LogoutIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { TRANSITIONS } from '@/shared/animations/transitions';
import { useOutsideClick } from '@/hooks/useOutsideClick';

type UserDropdownProps = {};

const UserDropdown = ({}: UserDropdownProps) => {
    const { user } = useAuthState();
    const { logout } = useAuthActions();

    const [isOpen, setIsOpen] = useState(false);
    const content = useRef<HTMLDivElement>(null);
    useOutsideClick(content, () => setIsOpen(false));

    useEffect(() => {
        if (!user) setIsOpen(false);
    }, [user]);

    if (!user) return null;
    return (
        <div className={styles.container}>
            <Button
                variant={'transparent'}
                className={styles.button}
                aria-label="Open user menu dropdown"
                onClick={() => setIsOpen((prevState) => !prevState)}
            >
                <UserIcon />
            </Button>
            <AnimatePresence mode={'wait'}>
                {isOpen && (
                    <motion.div
                        ref={content}
                        className={styles.dropdown}
                        initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                        animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
                        exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                        transition={TRANSITIONS.NORMAL}
                        style={{ willChange: 'clip-path, opacity' }}
                    >
                        <nav className={styles.nav}>
                            <ul
                                className={styles.nav__list}
                                onClick={() => setIsOpen(false)}
                            >
                                <li className={styles.nav__item}>
                                    <Link
                                        href={ROUTES.ORDERS}
                                        className={styles.nav__action}
                                    >
                                        <MallbagIcon />
                                        My orders
                                    </Link>
                                </li>
                                <li className={styles.nav__item}>
                                    <Button
                                        onClick={logout}
                                        variant={'transparent'}
                                        className={styles.nav__action}
                                    >
                                        <LogoutIcon />
                                        Logout
                                    </Button>
                                </li>
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserDropdown;
