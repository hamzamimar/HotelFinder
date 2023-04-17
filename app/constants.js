import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';
export const db = SQLite.openDatabase('xyz.db');

export const  Global = {
 main : '#1A5751'
}


export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  let location = await Location.getCurrentPositionAsync({});
  return location.coords;
}

  export function executeSql(query, params = []) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS fav (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, hotelID TEXT, latitude TEXT, longitude TEXT)'
          );
        });
      db.transaction(tx => {
        tx.executeSql(
          query,
          params,
          (_, { rows }) => {
            resolve(rows);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
  
export const NAME = 'news';
export const PAGESIZE = 20;

//Redux Action Types
export const HEADLINES_AVAILABLE = `${NAME}/HEADLINES_AVAILABLE`;
export const CATEGORY_HEADLINES_AVAILABLE = `${NAME}/CATEGORY_HEADLINES_AVAILABLE`;

//API URL
export const API_URL = 'https://newsapi.org/v2';
// export const API_KEY = '?apiKey=82a26d489ff642968133859b08feea56';
export const API_KEY = '?apiKey=fe95679257a34063ad385a947832fceb';
export const Hotel_API_KEY = '?apiKey=a547cfff845ea17e83d033f089248f63';
export const API_PARAMS = `&pageSize=${PAGESIZE}`;

//API End Points
export const HEADLINES = `${API_URL}/top-headlines${API_KEY}${API_PARAMS}`;
export const SEARCH = `${API_URL}/everything${API_KEY}${API_PARAMS}&sortBy=relevancy`;

//CATEGORIES
export const CATEGORIES = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];