'use client';
import styles from './styles.module.scss';
import { useAuthState } from '@/context/AuthContext';
import { useState } from 'react';
import UserIcon from '@/shared/icons/UserIcon';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/config/routes.config';
import MallbagIcon from '@/shared/icons/MallbagIcon';
import LogoutIcon from '@/shared/icons/LogoutIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { TRANSITIONS } from '@/shared/animations/transitions';

type UserDropdownProps = {};

const UserDropdown = ({}: UserDropdownProps) => {
    const { user } = useAuthState();
    if (!user) return null;

    const [isOpen, setIsOpen] = useState(false);

    console.log(isOpen);
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
                        className={styles.dropdown}
                        initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                        animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
                        exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                        transition={TRANSITIONS.NORMAL}
                        style={{ willChange: 'clip-path, opacity' }}
                    >
                        <nav className={styles.nav}>
                            <ul className={styles.nav__list}>
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
