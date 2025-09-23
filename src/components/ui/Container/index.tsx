import styles from './styles.module.scss';
import React from 'react';
import clsx from 'clsx';

type ContainerProps = {
    className?: string;
    children: React.ReactNode;
};

const Container = ({ className, children }: ContainerProps) => {
    return <div className={clsx(styles.container, className)}>{children}</div>;
};

export default Container;
