import {GET_PROPERTIES, ADD_PROPERTY, DELETE_PROPERTY, PROPERTIES_LOADING} from './types.js';
import axios from 'axios';
import {tokenConfig} from './authActions.js';
import {returnErrors} from './errorActions.js';

export const getProperties = (userId) => dispatch => {
    dispatch(setPropertiesLoading()); 
    axios.get(`/api/users/properties/${userId}`, tokenConfig(getState))
        .then(res => dispatch({
            type:GET_PROPERTIES,
            //The data from the response is the list of properties for the user
            //Send that as a payload to the reducer
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteProperty = (id) => (dispatch, getState) => {
    axios.delete(`/api/users/properties/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_PROPERTY,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addProperty = (property, userId) => (dispatch, getState) => {
    axios.post(`/api/users/properties/${userId}`, property, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_PROPERTY,
            //The response is the property just added
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setPropertiesLoading = () => {
    return {
        //Sets from false to true
        type: PROPERTIES_LOADING
    }
}