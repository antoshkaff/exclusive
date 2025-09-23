import styles from './styles.module.scss';
import MinusIcon from '@/shared/icons/MinusIcon';
import PlusIcon from '@/shared/icons/PlusIcon';
import { useId } from 'react';
import clsx from 'clsx';

type QuantityStepperProps = {
    value: number;
    onChange: (n: number) => void;
    min?: number;
    max?: number;
    step?: number;
};

const QuantityStepper = ({
    onChange,
    value,
    min = 1,
    max = 99,
    step = 1,
}: QuantityStepperProps) => {
    const clamp = (n: number) => Math.min(max, Math.max(min, n));
    const dec = () => onChange(clamp(value - step));
    const inc = () => onChange(clamp(value + step));

    return (
        <div className={styles.stepper}>
            <button
                onClick={dec}
                className={styles.stepper__button}
                aria-label="Decrease quantity"
            >
                <MinusIcon />
            </button>
            <input
                type="number"
                value={value}
                aria-label="Quantity"
                className={styles.stepper__input}
                name="quantity"
                readOnly
            />
            <button
                onClick={inc}
                className={styles.stepper__button}
                aria-label="Increase quantity"
            >
                <PlusIcon />
            </button>
        </div>
    );
};

export default QuantityStepper;
