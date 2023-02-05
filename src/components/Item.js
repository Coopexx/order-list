import React, { useState } from 'react';
import styles from './Item.module.css';
const classNames = require('classnames');

const Item = (props) => {
    //HOOKS ______________________________________________________________________________________________________________________________________________
    const [isActive, setIsActive] = useState(false);
    const [add, setAdd] = useState(false);
    const [inputValue, setInputValue] = useState('');

    //HANDLER ____________________________________________________________________________________________________________________________________________
    const changeClassHandler = () => {
        if (isActive) {
            return true;
        } else {
            return false;
        }
    };
    const inputChangeHandler = (event) => {
        setInputValue(event.target.value);
    };

    //ADD ________________________________________________________________________________________________________________________________________________
    const addItemHandler = () => {
        setAdd(true);
    };

    //REMOVE ______________________________________________________________________________________________________________________________________________
    const removeItemHandler = () => {
        setIsActive(true);
        props.remove({
            _id: props.data.id,
            name: props.data.name,
            code: props.data.code,
            amount: props.data.amount,
        });
    };
    const removeInputHandler = () => {
        setAdd(false);
    };

    //FORM SUBMIT _________________________________________________________________________________________________________________________________________
    const formSubmitHandler = (event) => {
        event.preventDefault();
        props.add({
            _id: props.data.id,
            name: props.data.name,
            code: props.data.code,
            amount: props.data.amount + Number(inputValue),
        });
        setInputValue('');
    };

    //HTML ITEMS____________________________________________________________________________________________________________________________________________
    const WindowItems = () => {
        return (
            <div
                className={classNames({
                    [styles.row]: true,
                    [styles.delete]: changeClassHandler(),
                    [styles.deleteSVG]: changeClassHandler(),
                    [styles.deleteTrash]: changeClassHandler(),
                })}
            >
                <p className={`${styles.column} ${styles.borderChild}`}>
                    {props.data.name}
                </p>
                <p
                    className={`${styles.column} ${styles.borderChild} ${styles.flex}`}
                >
                    {props.data.code}
                </p>
                <p className={`${styles.column} ${styles.flex}`}>
                    {props.data.amount}
                </p>
                {props.flagged && (
                    <div className={styles.trash} onClick={removeItemHandler}>
                        <svg className={styles.svg} viewBox="0 0 32 32">
                            <g fill="#d0312d">
                                <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
                                <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
                            </g>
                        </svg>
                    </div>
                )}
                {!props.flagged && (
                    <div
                        className={classNames([styles.trash], [styles.add])}
                        onClick={addItemHandler}
                    >
                        {!add && (
                            <svg className={styles.svg} viewBox="0 0 32 32">
                                <g fill="#3cb043">
                                    <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
                                </g>
                            </svg>
                        )}
                        {add && (
                            <div className={styles.inputDiv}>
                                <form onSubmit={formSubmitHandler}>
                                    <input
                                        onBlur={removeInputHandler}
                                        className={styles.input}
                                        onChange={inputChangeHandler}
                                        value={inputValue}
                                        type="number"
                                        min="0"
                                    ></input>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    //RENDERED HTML__________________________________________________________________________________________________________________________________________
    return <React.Fragment>{}</React.Fragment>;
};

export default Item;
