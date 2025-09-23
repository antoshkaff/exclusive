import styles from './styles.module.scss';
import Link from 'next/link';

const Logo = () => {
    return (
        <Link href={'/'} className={styles.logo}>
            Exclusive
        </Link>
    );
};

export default Logo;
