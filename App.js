import React from 'react';
import { Provider } from 'react-redux';
import Router from './app/router';
import store from './app/redux/store';
import { useEffect } from 'react';
import { db } from './app/constants';
export default function App() {
    useEffect(()=>{
      
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS fav (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, hotelID TEXT, latitude TEXT, longitude TEXT)'
            );
        }, (error) => {
            console.log('Error while creating table:', error);
        }, () => {
            console.log('Tablesss------------------------------------- created successfully!');
        });
    }, []);

    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}
