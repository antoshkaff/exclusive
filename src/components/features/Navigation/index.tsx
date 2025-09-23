'use client';

import styles from './styles.module.scss';
import { NAV_LINKS } from '@/config/nav.config';
import { usePathname } from 'next/navigation';
import NavLink from '@/components/ui/NavLink';
import { ROUTES } from '@/config/routes.config';
import { useAuthState } from '@/context/AuthContext';

type NavigationProps = {};

const Navigation = ({}: NavigationProps) => {
    const pathname = usePathname();
    const { user } = useAuthState();

    return (
        <nav>
            <ul className={styles.nav__list}>
                {NAV_LINKS.map((link) => (
                    <li key={link.name}>
                        <NavLink
                            navLink={link}
                            isActive={pathname === link.href}
                        />
                    </li>
                ))}
                {!user && (
                    <li>
                        <NavLink
                            navLink={{ href: ROUTES.SIGN_IN, name: 'Sign in' }}
                            isActive={pathname === ROUTES.SIGN_IN}
                        />
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
