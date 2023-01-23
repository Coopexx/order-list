import React, { useState } from 'react'

import styles from './Navigation.module.css'

const Navigation = (props) => {
    const [textfield, setTextfield] = useState('')
    const [filter, setFilter] = useState('')

    const showTextfield = () => {
        if (textfield) {
            setTextfield('')
        } else {
            setTextfield(1)
        }
    }

    const filterHandler = (event) => {
        event.preventDefault()
        setFilter('')
    }

    let errorStyle = ''

    const filterChangeHandler = (event) => {
        setFilter(event.target.value)
        console.log(props.error)
        console.log(errorStyle)
        props.filterHandler(event.target.value)
    }

    return (
        <div className={styles.background}>
            <div className={styles.column}>Order List</div>
            <div className={styles.filterDiv}>
                {textfield && (
                    <form onSubmit={filterHandler}>
                        <input
                            onChange={filterChangeHandler}
                            className={`${props.error ? styles.error : ''}`}
                        ></input>
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
    )
}

export default Navigation
