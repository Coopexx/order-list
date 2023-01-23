import React, { useState } from 'react'
import Item from './components/Item'
import Navigation from './components/Navigation'
import Description from './components/Description'

import styles from './App.module.css'

function App() {
    const DUMMY_DATA = [
        { id: '0', code: 'ZG05-04', name: 'Hyperflask M', amount: '12' },
        {
            id: '1',
            code: 'ZG03-03',
            name: 'Cellstack (10 layers)',
            amount: '12',
        },
        {
            id: '2',
            code: 'LM041-01',
            name: 'Serological Pipette 10mL',
            amount: '4',
        },
        {
            id: '3',
            code: 'LM042-03',
            name: 'Centrifugation Tube (500mL)',

            amount: '42',
        },
        { id: '4', code: 'ZG04-02', name: 'T75 Flask', amount: '96' },
    ]

    const [list, setList] = useState(DUMMY_DATA)
    const [error, setError] = useState(false)

    const filterHandler = (search) => {
        if (typeof search !== 'string' || search.length === 0) {
            setError(true)
        } else {
            setError(false)
        }
        let filtered = DUMMY_DATA.filter((data) => {
            if (data.name.toLowerCase().includes(search.toLowerCase())) {
                return true
            }
            if (data.code.toLowerCase().includes(search.toLowerCase())) {
                return true
            }
            return false
        })
        setList(filtered)
    }

    return (
        <div className={styles.background}>
            <div className={styles.window}>
                <Navigation filterHandler={filterHandler} error={error} />
                <Description />
                {list.map((data, i) => (
                    <Item data={list[i]} key={data.id} />
                ))}
            </div>
            <div className={styles.edit}>+</div>
        </div>
    )
}

export default App
