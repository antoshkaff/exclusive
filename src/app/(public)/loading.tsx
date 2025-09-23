import React from 'react';
import styles from './loading.module.scss';

const loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default loading;
