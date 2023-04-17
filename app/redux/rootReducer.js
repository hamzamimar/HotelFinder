// Description: Root Reducer - Updated

import { combineReducers } from 'redux';

import hotelReducer from "../reducer"

// Combine all the reducers
const rootReducer = combineReducers({ hotelReducer });

export default rootReducer;