import React from 'react'
import styles from './Item.module.css'

const Item = (props) => {
    return (
        <div className={styles.row}>
            <p className={styles.column}>{props.data.name}</p>
            <p className={styles.column}>{props.data.code}</p>
            <p className={styles.column}>{props.data.amount}</p>
        </div>
    )
}

export default Item
