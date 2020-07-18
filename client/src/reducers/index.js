import {combineReducers} from 'redux';
import itemReducer from './itemReducer.js';
import errorReducer from './errorReducer.js';
import authReducer from './authReducer.js';
import propertyReducer from './propertyReducer.js';

export default combineReducers({ 
    item: itemReducer,
    properties: propertyReducer,
    error: errorReducer,
    auth: authReducer
});