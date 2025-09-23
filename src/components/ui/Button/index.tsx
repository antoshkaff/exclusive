import styles from './styles.module.scss';
import clsx from 'clsx';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

type ButtonVariant = 'accent' | 'transparent' | 'bordered' | 'circle';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
    children: ReactNode;
    variant: ButtonVariant;
    size?: ButtonSize;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
    children,
    variant,
    size = 'lg',
    className,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                styles.button,
                variant && styles[`button--${variant}`],
                styles[size],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default memo(Button);
