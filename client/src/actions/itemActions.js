import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types.js';
import axios from 'axios';

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
};

export const deleteItem = (id) => dispatch => {
    axios.delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
};

export const addItem = (item) => dispatch => {
    axios.post('/api/items', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
};

export const setItemsLoading = () => {
    return {
        //Sets from false to true
        type: ITEMS_LOADING
    }
}