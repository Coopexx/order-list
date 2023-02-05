import React, { useState, useEffect } from 'react';
import Item from './components/Item';
import Navigation from './components/Navigation';
import Description from './components/Description';
import styles from './App.module.css';

function App() {
    //HOOKS ______________________________________________________________________________________________________________________________________________
    const [list, setList] = useState({});
    const [filteredList, setFilteredList] = useState({});
    const [renderedList, setRenderedList] = useState({});
    const [listLoaded, setListLoaded] = useState(false);
    const 
    const [switchButton, setSwitchButton] = useState('inProcess');

    useEffect(() => {
        fetchItemsHandler();
    }, []);

    //VARIABLES ___________________________________________________________________________________________________________________________________________
    const url = 'http://127.0.0.1:3000/api/v1/items';

    //DATA IMPORT _________________________________________________________________________________________________________________________________________
    async function fetchItemsHandler(type) {
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
        removeEmptyAmounts(data, type);
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
    const removeEmptyAmounts = (data, type) => {
        let orders = data.filter((dataObj) => {
            if (dataObj.amount > 0) {
                return true;
            } else {
                return false;
            }
        });
        let flaggedOrders = orders.map((order) => {
            return { ...order, flag: true };
        });
        setFilteredList(flaggedOrders);
        if (type === 'patch') {
            setRenderedList(data);
        } else if (type === 'delete') {
            setRenderedList(flaggedOrders);
        } else {
            setRenderedList(flaggedOrders);
        }
        setListLoaded(true);
    };

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

    //FILTER ______________________________________________________________________________________________________________________________________________
    const filterHandler = (searchString) => {
        if (switchButton) {
            let filtered = list.filter((data) => {
                if (
                    data.name
                        .toLowerCase()
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                }
                if (
                    data.code
                        .toLowerCase()
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            setRenderedList(filtered);
        } else {
            let filtered = filteredList.filter((data) => {
                if (
                    data.name
                        .toLowerCase()
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                }
                if (
                    data.code
                        .toLowerCase()
                        .includes(searchString.toLowerCase().replace(/\s/g, ''))
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            setRenderedList(filtered);
        }
    };

    //SWITCH BUTTON _______________________________________________________________________________________________________________________________________
    const toggleSwitchButton = (state) => {
        if (state === 'all') {
            setSwitchButton('all');
        }
        if (state === 'inProcess') {
            setSwitchButton('inProcess');
        }
        if (state === 'finished') {
            setSwitchButton('afinished');
        }
    };

    //HTML ITEMS ___________________________________________________________________________________________________________________________________________
    const All = () => {
        return (
            <div
                className={styles.window}
                onClick={() => toggleSwitchButton('all')}
            >
                <Navigation filterHandler={filterHandler} />
                <Description />
                <div className={styles.itemContainer}>
                    {listLoaded &&
                        renderedList.map((data, i) => (
                            <Item
                                data={renderedList[i]}
                                key={data.id}
                                add={addAmountHandler}
                                flagged={data.flag}
                                isWindow={true}
                            />
                        ))}
                </div>
            </div>
        );
    };

    const InProcess = () => {
        return (
            <div
                className={styles.window}
                onClick={() => toggleSwitchButton('inProcess')}
            >
                <Navigation filterHandler={filterHandler} />
                <Description />
                <div className={styles.itemContainer}>
                    {listLoaded &&
                        renderedList.map((data, i) => (
                            <Item
                                data={renderedList[i]}
                                key={data.id}
                                type={type}
                                flagged={data.flag}
                                isWindow={true}
                            />
                        ))}
                </div>
            </div>
        );
    };

    const Finished = () => {
        return (
            <div
                className={styles.window}
                onClick={() => toggleSwitchButton('finished')}
            >
                <Navigation filterHandler={filterHandler} />
                <Description />
                <div className={styles.itemContainer}>
                    {listLoaded &&
                        renderedList.map((data, i) => (
                            <Item
                                data={renderedList[i]}
                                key={data.id}
                                delete={deleteAmountHandler}
                                flagged={data.flag}
                                isWindow={true}
                            />
                        ))}
                </div>
            </div>
        );
    };

    //RENDERED HTML__________________________________________________________________________________________________________________________________________
    return (
        <div className={styles.background}>
            {switchButton === 'all' && <All />}
            {switchButton === 'inProcess' && <InProcess />}
            {switchButton === 'finished' && <Finished />}
        </div>
    );
}

export default App;
