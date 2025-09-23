import styles from './styles.module.scss';
import { ReactNode } from 'react';
import Link from 'next/link';

type SectionProps = {
    title: string;
    subtitle?: string;
    children: ReactNode;
    action?: string;
    actionText?: string;
};

const Section = ({
    title,
    subtitle,
    action,
    actionText,
    children,
}: SectionProps) => {
    return (
        <section className={styles.section}>
            <header className={styles.section__header}>
                <div className={styles.section__content}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && (
                        <span className={styles.subtitle}>{subtitle}</span>
                    )}
                </div>

                {!!action && !!actionText && (
                    <Link href={action} className={styles.section__action}>
                        {actionText}
                    </Link>
                )}
            </header>
            <div className={styles.body}>{children}</div>
        </section>
    );
};

export default Section;
