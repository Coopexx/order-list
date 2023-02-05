import React, { useState } from 'react';

import styles from './Navigation.module.css';

const Navigation = (props) => {
    //HOOKS________________________________________________________________________________________________________________________________________________
    const [textfield, setTextfield] = useState('');
    const [filter, setFilter] = useState('');

    //FILTER_______________________________________________________________________________________________________________________________________________
    const filterChangeHandler = (event) => {
        setFilter(event.target.value);
        props.filterHandler(event.target.value);
    };

    //HANDLER______________________________________________________________________________________________________________________________________________
    const showTextfield = () => {
        if (textfield) {
            setTextfield('');
        } else {
            setTextfield(1);
        }
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        setFilter('');
    };

    const changeModeHandler = () => {
        props.toggleViewHandler();
        setFilter('');
        setTextfield('');
    };

    //RENDERED HTML_______________________________________________________________________________________________________________________________________
    return (
        <div className={styles.background}>
            <div className={styles.column}>
                <label className={styles.switch}>
                    <input type="checkbox" onClick={changeModeHandler} />
                    <span className={`${styles.slider} + ${styles.round}`}>
                        <span className={styles.orders}>Orders</span>
                        <span className={styles.all}>All</span>
                    </span>
                </label>
            </div>
            <div className={styles.filterDiv}>
                {textfield && (
                    <form onSubmit={formSubmitHandler}>
                        <input
                            onChange={filterChangeHandler}
                            value={filter}
                        ></input>
                    </form>
                )}

                <svg
                    className={styles.filter}
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
