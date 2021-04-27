import axios from 'axios';
import { GET_USER_PLACES, DELETE_USER_PLACE, CLEAR } from '../actionType/actionType';
const DATABASE = 'http://localhost:5000';

export const postPlace = (formState, history) => async (dispatch, getState) => {
    const { title, description, image, address } = formState;
    const token = getState().userReducer.user.token;
    const config = { headers: { 'Content-Type': 'application/json', auth: token } };

    const body = JSON.stringify({
        title, 
        description, 
        image, 
        address, 
    });

    try {
        await axios.post(`${DATABASE}/api/places/new-place`, body, config);
        const userId = getState().userReducer.user.userId;
        history.push(`/${userId}/places`);
    } catch (error) {
        console.dir(error);
    }
}

export const getUserPlaces = (id) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const response = await axios.get(`${DATABASE}/api/places/${id}`, config);
        dispatch({
            type: GET_USER_PLACES,
            payload: response.data
        })
    } catch (error) {
        console.dir(error);
    }
}

export const deletePlace = (id, cb) => async (dispatch, getState) => {
    const token = getState().userReducer.user.token;
    const config = { headers: { 'Content-Type': 'application/json', auth: token } };
    try {
        cb();
        const response = await axios.delete(`${DATABASE}/api/places/remove/${id}`, config);
        dispatch({
            type: DELETE_USER_PLACE,
            payload: response.data
        })
    } catch (error) {
        console.dir(error);
    }
}

export const editPlace = (formState, id, history) => async (dispatch, getState) => {
    const { title, description } = formState;
    const token = getState().userReducer.user.token;
    const config = { headers: { 'Content-Type': 'application/json', auth: token } };
    const body = JSON.stringify({
        title,
        description
    });

    try {
        await axios.put(`${DATABASE}/api/places/edit-place/${id}`, body, config);
        const userId = getState().userReducer.user.userId;
        history.push(`/${userId}/places`);
    } catch (error) {
        console.dir(error);
    }
}

export const clearRepos = () => dispatch => {
    dispatch({
        type: CLEAR
    });
}