import axios from 'axios';
import { GET_USERS, REGISTER_USER, LOGIN_USER, REGISTER_FAIL, LOGIN_FAIL, CLEAR_ERROR, LOGOUT, LOADER } from '../actionType/actionType';
const DATABASE = 'http://localhost:5000';

export const getUsers = () => async dispatch => {
    try {
        const response = await axios.get(`${DATABASE}/api/users`);
        dispatch({
            type: GET_USERS,
            payload: response.data
        })
    } catch (error) {
        console.log(error);
    }
}

export const newUser = (formState, history) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { username, email, password } = formState;
    const body = JSON.stringify({
        username,
        email,
        password
    });

    try {
        const response = await axios.post(`${DATABASE}/api/users/new-user`, body, config);
        dispatch({
            type: REGISTER_USER,
            payload: response.data
        })
        localStorage.setItem('userData', JSON.stringify(response.data));
        history.push('/');
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data
        })
        setTimeout(() => {
            dispatch({
                type: CLEAR_ERROR
            })
        }, 3000)
    }
}

export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    localStorage.removeItem('userData');
}

export const loginUser = (formState, history) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { email, password } = formState;
    const body = JSON.stringify({
        email,
        password
    });

    try {
        const response = await axios.post(`${DATABASE}/api/users/login`, body, config);
        dispatch({
            type: LOGIN_USER,
            payload: response.data
        })
        localStorage.setItem('userData', JSON.stringify(response.data));
        history.push('/');
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data
        })
        setTimeout(() => {
            dispatch({
                type: CLEAR_ERROR
            })
        }, 3000)
    }
}

export const spinnerFunc = () => dispatch => {
    dispatch({
        type: LOADER,
    })
}