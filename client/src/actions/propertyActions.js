import {GET_PROPERTIES, ADD_PROPERTY, DELETE_PROPERTY, PROPERTIES_LOADING, GET_ALL_PROPERTIES} from './types.js';
import axios from 'axios';
import {tokenConfig} from './authActions.js';
import {returnErrors} from './errorActions.js';

/* Function for getting all properties (for dev purposes) */
export const getAllProperites = () => dispatch => {
    axios.get('/api/users/properties')
    .then(res => dispatch({
        type: GET_ALL_PROPERTIES,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}; 

/* Function for getting properties of a specific user */
// export const getProperties = (userId) => dispatch => {
//     dispatch(setPropertiesLoading()); 
//     axios.get(`/api/users/properties/${userId}`, tokenConfig(getState))
//         .then(res => dispatch({
//             type:GET_PROPERTIES,
//             payload: res.data
//         }))
//         .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
// };

/* Function for deleting a property */
export const deleteProperty = (id) => (dispatch, getState) => {
    axios.delete(`/api/users/properties/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_PROPERTY,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

/* Function for adding a property */
export const addProperty = (property) => (dispatch, getState) => {
    axios.post('/api/users/properties', property, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_PROPERTY,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// export const setPropertiesLoading = () => {
//     return {
//         //Sets from false to true
//         type: PROPERTIES_LOADING
//     }
// }