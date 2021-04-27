import { GET_USERS, REGISTER_USER, REGISTER_FAIL, LOGIN_FAIL, CLEAR_ERROR, LOGOUT, LOGIN_USER, LOADER } from '../actionType/actionType';

const initState = {
    users: [],
    user: JSON.parse(localStorage.getItem('userData')) || null,
    isLogin: localStorage.userData ? true : false,
    error: null,
    isLoading: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case REGISTER_USER:
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                isLoading: false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                isLogin: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case LOADER:
            return {
                ...state,
                isLoading: true
            }
        default: return state;
    }
}

export default reducer;