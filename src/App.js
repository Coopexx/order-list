import React, { useState, useEffect } from 'react';
import Item from './components/Item';
import Navigation from './components/Navigation';
import Description from './components/Description';
import styles from './App.module.css';

function App() {
    //HOOKS ______________________________________________________________________________________________________________________________________________
    const [list, setList] = useState({});
    const [listLoaded, setListLoaded] = useState(false);
    const [type, setType] = useState('inProcess');

    useEffect(() => {
        fetchItemsHandler();
    }, []);

    //VARIABLES ___________________________________________________________________________________________________________________________________________
    const url = 'http://127.0.0.1:3000/api/v1/items';

    //DATA IMPORT _________________________________________________________________________________________________________________________________________
    async function fetchItemsHandler() {
        const response = await fetch(url);
        const rawData = await response.json();
        const data = rawData.map((dataObj) => {
            return {
                id: dataObj._id,
                name: dataObj.name,
                code: dataObj.code,
                amount: dataObj.amount,
                history: dataObj.history,
            };
        });
        sortData(data);
        setList(data);
        setListLoaded(true);
    }
    const sortData = (dataObj) => {
        dataObj.sort(compare);
        return dataObj;
    };
    function compare(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    //SERVER REQUESTS _____________________________________________________________________________________________________________________________________
    const addAmountHandler = async (dataObj) => {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataObj),
            });
            const content = await response.json();
            //Include in notification upper right corner
            // console.log(content);
            fetchItemsHandler('patch');
        } catch (err) {
            console.log(err);
        }
    };
    const removeAmountHandler = async (dataObj) => {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataObj),
            });
            const content = await response.json();
            //Include in notification upper right corner
            // console.log(content);
            fetchItemsHandler('delete');
        } catch (err) {
            console.log(err);
        }
    };

    const deleteAmountHandler = () => {};

    //SWITCH BUTTON _______________________________________________________________________________________________________________________________________
    const setTypeHandler = (state) => {
        if (state === 'all') {
            setType('all');
        }
        if (state === 'inProcess') {
            setType('inProcess');
        }
        if (state === 'finished') {
            setType('afinished');
        }
    };

    //RENDERED HTML__________________________________________________________________________________________________________________________________________
    return (
        <div className={styles.background}>
            <div className={styles.window}>
                <Navigation />
                <Description />
                <div className={styles.itemContainer}>
                    {listLoaded &&
                        list.map((data, i) => (
                            <Item
                                data={data[i]}
                                key={data.id}
                                type={type}
                                setTypeHandler={setTypeHandler}
                            />
                        ))}
                </div>
            </div>
            ;
        </div>
    );
}

export default App;
