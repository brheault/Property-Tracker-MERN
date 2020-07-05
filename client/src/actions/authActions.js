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
    console.log("Hello World", tokenConfig(getState));
    axios.get('/api/auth/user', tokenConfig(getState))
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

//Login User
export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

//Logout User
export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    };
};

//Set up headers with token
export const tokenConfig = getState => {
    //Get Token from local storage
    const token = getState().auth.token;
    console.log(token);

    //Headers
    const config={
        headers: {
            "content-type": "application/json"
        }
    };
    //If theres a token, add it to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}