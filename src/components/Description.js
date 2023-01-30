import React from 'react';
import styles from './Description.module.css';

const Description = () => {
    return (
        <div className={styles.row}>
            <p className={styles.column}>Item</p>
            <p className={`${styles.column} ${styles.flex}`}>Exact Code</p>
            <p className={`${styles.column} ${styles.flex}`}>Amount</p>
        </div>
    );
};

export default Description;
