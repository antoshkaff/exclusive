import styles from './styles.module.scss';
import Logo from '@/components/ui/Logo';
import Navigation from '@/components/features/Navigation';
import Input from '@/components/ui/Input';
import SearchIcon from '@/shared/icons/SearchIcon';
import HeartIcon from '@/shared/icons/HeartIcon';
import CartIcon from '@/shared/icons/CartIcon';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import UserDropdown from '@/components/features/UserDropdown';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
    return (
        <header className={styles.header}>
            <Container>
                <Logo />
                <Navigation />
                <div className={styles.header__features}>
                    <form action="/search">
                        <Input
                            name="q"
                            size={'sm'}
                            endIcon={<SearchIcon />}
                            containerClassName={styles.inputContainer}
                            placeholder={'What are you looking for?'}
                        />
                    </form>

                    <div className={styles.header__actions}>
                        <Link href={'/wish'} aria-label="Open 'Wish' page">
                            <HeartIcon />
                        </Link>
                        <Link href={'/cart'} aria-label="Open 'Cart' page">
                            <CartIcon />
                        </Link>
                        <UserDropdown />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
