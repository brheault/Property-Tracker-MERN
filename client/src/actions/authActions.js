import axios from 'axios';
import {returnErrors} from './errorActions.js';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types.js';

//Check token and load user
export const loadUser = () => (dispatch, getState) => {
    //Set User loading to true
    dispatch({type: USER_LOADING});

    //Get Token from local storage
    const token = getState().auth.token;
    //Headers
    const config={
        headers: {
            "content-type": "application/json"
        }
    }
    //If theres a token, add it to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }
    axios.get('/api/auth/user', config)
        .then(res => dispatch({type: USER_LOADED, payload: res.data}))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

//Resister USER
export const register = ({ name, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

//Logout User
export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    };
};