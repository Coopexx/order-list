import React, { useState, useEffect } from 'react';
import Item from './components/Item';
import Navigation from './components/Navigation';
import Description from './components/Description';

import styles from './App.module.css';

function App() {
    const [list, setList] = useState({});
    const [filteredList, setFilteredList] = useState({});
    const [renderedList, setRenderedList] = useState({});
    const [listLoaded, setListLoaded] = useState(false);
    const [mode, setMode] = useState(false); //true = Orders, false = All
    const [showWindow, setShowWindow] = useState(true);

    const url = 'http://127.0.0.1:3000/api/v1/items';

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

    function compare(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    const sortData = (dataObj) => {
        dataObj.sort(compare);
        return dataObj;
    };

    //DATA IMPORT
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

    //FILTER
    const filterHandler = (searchString) => {
        if (mode) {
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

    //HANDLER
    const toggleHistoryHandler = () => {
        setShowWindow(!showWindow);
    };

    //SWITCH BUTTON VIEW
    const toggleViewHandler = () => {
        if (mode === true) {
            setMode(false);
            setRenderedList(filteredList);
        } else {
            setMode(true);
            setRenderedList(list);
        }
    };

    //SERVER REQUESTS
    //UPDATE dbAmount + itemAmount
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

    const Window = () => {
        return (
            <div className={styles.window}>
                <Navigation
                    filterHandler={filterHandler}
                    toggleViewHandler={toggleViewHandler}
                />
                <Description />
                <div className={styles.itemContainer}>
                    {listLoaded &&
                        renderedList.map((data, i) => (
                            <Item
                                data={renderedList[i]}
                                key={data.id}
                                add={addAmountHandler}
                                remove={removeAmountHandler}
                                flagged={data.flag}
                                isWindow={true}
                            />
                        ))}
                </div>
            </div>
        );
    };

    const History = () => {
        return (
            <div className={styles.historyDiv}>
                {listLoaded &&
                    renderedList.map((data, i) => (
                        <Item
                            data={renderedList[i]}
                            key={data.id}
                            isWindow={false}
                        />
                    ))}
            </div>
        );
    };

    useEffect(() => {
        fetchItemsHandler();
    }, []);

    return (
        <div className={styles.background}>
            {showWindow ? (
                <div className={styles.window}>
                    <Navigation
                        filterHandler={filterHandler}
                        toggleViewHandler={toggleViewHandler}
                    />
                    <Description />
                    <div className={styles.itemContainer}>
                        {listLoaded &&
                            renderedList.map((data, i) => (
                                <Item
                                    data={renderedList[i]}
                                    key={data.id}
                                    add={addAmountHandler}
                                    remove={removeAmountHandler}
                                    flagged={data.flag}
                                    isWindow={true}
                                />
                            ))}
                    </div>
                </div>
            ) : (
                <History />
            )}
            <button className={styles.history} onClick={toggleHistoryHandler}>
                History
            </button>
        </div>
    );
}

export default App;
