import styles from './styles.module.scss';
import SimpleBar from 'simplebar-react';
import { ReactNode } from 'react';

type ScrollAreaProps = {
    children: ReactNode;
    className?: string;
};

const ScrollArea = ({ className, children }: ScrollAreaProps) => {
    return (
        <SimpleBar className={styles.container} autoHide={false}>
            {children}
        </SimpleBar>
    );
};

export default ScrollArea;
