import React from 'react'
import Item from './components/Item'
import Navigation from './components/Navigation'

import styles from './App.module.css'

function App() {
    return (
        <div className={styles.background}>
            <div className={styles.window}>
                <Navigation />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    )
}

export default App
