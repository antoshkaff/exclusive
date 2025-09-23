import styles from './styles.module.scss';
import Input from '@/components/ui/Input';
import Container from '@/components/ui/Container';
import MailIcon from '@/shared/icons/MailIcon';
import Link from 'next/link';

type FooterProps = {};

const Footer = ({}: FooterProps) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__inner}>
                <Container>
                    <section className={styles.section}>
                        <h2 className={styles.section__title}>
                            Exclusive <br /> Subscribe
                        </h2>
                        <span>Get 10% off your first order</span>
                        <Input
                            size={'md'}
                            variant={'transparent'}
                            placeholder={'Enter your email'}
                            endIcon={<MailIcon />}
                        />
                    </section>
                    <section className={styles.section}>
                        <h2 className={styles.section__title}>Support</h2>
                        <ul className={styles.list}>
                            <li>
                                <address>
                                    111 Bijoy sarani, Dhaka, DH 1515,
                                    Bangladesh.
                                </address>
                            </li>
                            <li>
                                <a href={'mailto:exclusive@gmail.com'}>
                                    exclusive@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href={'tel:+88015888889999'}>
                                    +88015-88888-9999
                                </a>
                            </li>
                        </ul>
                    </section>
                    <section className={styles.section}>
                        <h2 className={styles.section__title}>Account</h2>
                        <nav>
                            <ul className={styles.list}>
                                <li>
                                    <Link href={'/'}>My Account</Link>
                                </li>
                                <li>
                                    <Link href={'/'}>Login / Register</Link>
                                </li>
                                <li>
                                    <Link href={'/'}>Cart</Link>
                                </li>
                                <li>
                                    <Link href={'/'}>Wishlist</Link>
                                </li>
                            </ul>
                        </nav>
                    </section>
                    <section className={styles.section}>
                        <h2 className={styles.section__title}>Quick Link</h2>
                        <nav>
                            <ul className={styles.list}>
                                <li>
                                    <Link href={'/'}>Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href={'/'}>Terms Of Use</Link>
                                </li>
                                <li>
                                    <Link href={'/'}>FAQ</Link>
                                </li>
                                <li>
                                    <Link href={'/'}>Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </section>
                </Container>
            </div>

            <div className={styles.footer__bottom}>
                <span>© Copyright Rimel 2022. All right reserved</span>
            </div>
        </footer>
    );
};

export default Footer;
