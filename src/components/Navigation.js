import React, { useState } from 'react';

import styles from './Navigation.module.css';

const Navigation = (props) => {
    const [textfield, setTextfield] = useState('');
    const [filter, setFilter] = useState('');
    const [mode, setMode] = useState(true); //true = Orders, false = All

    const showTextfield = () => {
        if (textfield) {
            setTextfield('');
        } else {
            setTextfield(1);
        }
    };

    const filterChangeHandler = (event) => {
        setFilter(event.target.value);
        props.filterHandler(event.target.value);
    };

    const changeModeHandler = () => {
        if (mode == true) {
            setMode(false);
        } else {
            setMode(true);
        }
        console.log(mode);
    };

    return (
        <div className={styles.background}>
            <div className={styles.column}>
                <label className={styles.switch} onClick={changeModeHandler}>
                    <input type="checkbox" />
                    <span className={`${styles.slider} + ${styles.round}`}>
                        <span className={styles.orders}>Orders</span>
                        <span className={styles.all}>All</span>
                    </span>
                </label>
            </div>
            <div className={styles.filterDiv}>
                {textfield && (
                    <form>
                        <input onChange={filterChangeHandler}></input>
                    </form>
                )}

                <svg
                    className={styles.filter}
                    xmlns="http://www.w3.org/2000/svg"
                    height="32px"
                    width="32px"
                    onClick={showTextfield}
                >
                    <g fill="#000">
                        <path d="M28 6l-10 10v10h-4v-10l-10-10h24z"></path>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Navigation;
