import styles from './styles.module.scss';
import Link from 'next/link';
import { INavLink } from '@/shared/types/nav-link.interface';
import { AnimatePresence, motion } from 'framer-motion';
import { underlineVariants } from '@/components/ui/NavLink/motion';

type NavLinkProps = {
    navLink: INavLink;
    isActive: boolean;
};

const NavLink = ({ navLink, isActive }: NavLinkProps) => {
    return (
        <Link className={styles.link} href={navLink.href}>
            {navLink.name}
            <AnimatePresence>
                {isActive && (
                    <motion.span
                        variants={underlineVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={styles.link__underline}
                    ></motion.span>
                )}
            </AnimatePresence>
        </Link>
    );
};

export default NavLink;
