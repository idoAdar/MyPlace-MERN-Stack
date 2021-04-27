import { GET_USER_PLACES, DELETE_USER_PLACE, CLEAR } from '../actionType/actionType';

const initState = {
    userPlaces: []
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case GET_USER_PLACES:
            return {
                ...state,
                userPlaces: action.payload 
            }
        case DELETE_USER_PLACE:
            const updateUserPlaces = state.userPlaces.filter(place => place._id !== action.payload._id);
            return {
                ...state,
                userPlaces: updateUserPlaces
            }
        case CLEAR:
            return {
                ...state,
                userPlaces: []
            }
        default: return state;
    }
}

export default reducer;