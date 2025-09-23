import styles from './styles.module.scss';
import clsx from 'clsx';
import React, { memo, ReactNode, useId } from 'react';
import Button from '@/components/ui/Button';

type InputVariant = 'border' | 'transparent';
type InputSize = 'sm' | 'md' | 'lg';

type NativeInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>;

type InputProps = NativeInputProps & {
    size: InputSize;
    containerClassName?: string;
    variant?: InputVariant;
    label?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    onIconClick?: () => void;
};

const Input = ({
    size,
    variant,
    className,
    containerClassName,
    label,
    endIcon,
    ...props
}: InputProps) => {
    const id = useId();

    return (
        <div className={clsx(styles.container, containerClassName)}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                className={clsx(
                    styles.input,
                    styles[size],
                    variant && styles[`input--${variant}`],
                    className,
                )}
                id={id}
                {...props}
            />
            {endIcon && (
                <Button
                    variant={'transparent'}
                    className={clsx(styles.icon, styles['icon--end'])}
                    aria-label="Done"
                    type="submit"
                >
                    {endIcon}
                </Button>
            )}
        </div>
    );
};

export default memo(Input);
