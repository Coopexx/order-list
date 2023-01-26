import React, { useState, useEffect } from 'react';
import Item from './components/Item';
import Navigation from './components/Navigation';
import Description from './components/Description';

import styles from './App.module.css';

function App() {
    const [list, setList] = useState({});
    const [filteredList, setFilteredList] = useState({});
    const [listLoaded, setListLoaded] = useState(false);

    const url = 'http://127.0.0.1:3000/api/v1/items';

    const removeEmptyAmounts = (data) => {
        let orders = data.filter((dataObj) => {
            if (dataObj.amount > 0) {
                return true;
            } else {
                return false;
            }
        });
        setList(orders);
        setFilteredList(orders);
        setListLoaded(true);
    };

    async function fetchItemsHandler() {
        const response = await fetch(url);
        const rawData = await response.json();
        const data = rawData.map((dataObj) => {
            return {
                id: dataObj._id,
                name: dataObj.name,
                code: dataObj.code,
                amount: dataObj.amount,
            };
        });

        removeEmptyAmounts(data);
    }

    const filterHandler = (search) => {
        let filtered = list.filter((data) => {
            if (
                data.name
                    .toLowerCase()
                    .includes(search.toLowerCase().replace(/\s/g, ''))
            ) {
                return true;
            }
            if (
                data.code
                    .toLowerCase()
                    .includes(search.toLowerCase().replace(/\s/g, ''))
            ) {
                return true;
            } else {
                return false;
            }
        });
        setFilteredList(filtered);
    };

    useEffect(() => {
        fetchItemsHandler();
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.window}>
                <Navigation filterHandler={filterHandler} />
                <Description />
                {listLoaded &&
                    filteredList.map((data, i) => (
                        <Item data={list[i]} key={data.id} />
                    ))}
            </div>
            <div className={styles.edit}>+</div>
        </div>
    );
}

export default App;
