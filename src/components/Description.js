import React from 'react';
import styles from './Description.module.css';

const Description = () => {
    return (
        <div className={styles.row}>
            <p className={styles.column}>Item</p>
            <p className={styles.column}>Exact Code</p>
            <p className={styles.column}>Amount</p>
        </div>
    );
};

export default Description;
