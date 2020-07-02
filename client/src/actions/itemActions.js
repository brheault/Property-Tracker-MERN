import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types.js';
import axios from 'axios';
import {tokenConfig} from './authActions.js';
import {returnErrors} from './errorActions.js';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    /*Get the items in the database using the GET api endpoint
      and sends it as a payload to GET_ITEMS in the reducer 
      inside the 'action' variable.*/ 
    axios.get('/api/items')
        .then(res => dispatch({
            type:GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteItem = (id) => (dispatch, getState) => {
    axios.delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addItem = (item) => (dispatch, getState) => {
    axios.post('/api/items', item, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => {
    return {
        //Sets from false to true
        type: ITEMS_LOADING
    }
}