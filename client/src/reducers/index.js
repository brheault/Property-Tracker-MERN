import {combineReducers} from 'redux';
import errorReducer from './errorReducer.js';
import authReducer from './authReducer.js';
import propertyReducer from './propertyReducer.js';

export default combineReducers({
    properties: propertyReducer,
    error: errorReducer,
    auth: authReducer
}); 