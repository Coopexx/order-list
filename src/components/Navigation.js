import React from 'react';

import styles from './Navigation.module.css';

const Navigation = (props) => {
    return (
        <div className={styles.background}>
            <div className={styles.column}>
                <label className={styles.switch}>
                    <div>
                        <p
                            className={styles.orders}
                            onClick={() => props.setTypeHandler('all')}
                        >
                            All
                        </p>
                        <p
                            className={styles.all}
                            onClick={() => props.setTypeHandler('inProcess')}
                        >
                            In Process
                        </p>
                        <p
                            className={styles.all}
                            onClick={() => props.setTypeHandler('finished')}
                        >
                            Finished
                        </p>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default Navigation;
