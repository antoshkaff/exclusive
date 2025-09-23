import React, { ReactNode } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import banner from '@/assets/banner.png';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className={styles.page}>
            <section className={styles.banner}>
                <Image
                    src={banner}
                    alt={'Banner'}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className={styles.banner__image}
                    priority
                />
            </section>
            <section className={styles.contentContainer}>{children}</section>
        </section>
    );
};

export default AuthLayout;
