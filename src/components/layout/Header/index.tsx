import styles from './styles.module.scss';
import Logo from '@/components/ui/Logo';
import Navigation from '@/components/features/Navigation';
import Input from '@/components/ui/Input';
import SearchIcon from '@/shared/icons/SearchIcon';
import Container from '@/components/ui/Container';
import UserDropdown from '@/components/features/UserDropdown';
import { ROUTES } from '@/config/routes.config';
import CartLink from '@/components/layout/Header/CartLink';
import WishLink from '@/components/layout/Header/WishLink';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
    return (
        <header className={styles.header}>
            <Container>
                <Logo />
                <Navigation />
                <div className={styles.header__features}>
                    <form action={ROUTES.SEARCH}>
                        <Input
                            name="q"
                            size={'sm'}
                            endIcon={<SearchIcon />}
                            containerClassName={styles.inputContainer}
                            placeholder={'What are you looking for?'}
                        />
                    </form>

                    <div className={styles.header__actions}>
                        <WishLink />
                        <CartLink />
                        <UserDropdown />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
