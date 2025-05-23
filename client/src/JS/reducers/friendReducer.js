// Necessary Imports

import { FRIEND_LOAD, FRIEND_REQUEST_FAIL, FRIEND_REQUEST_SUCCESS, FRIEND_RESPONSE_FAIL, FRIEND_RESPONSE_SUCCESS, GET_FRIEND_REQUESTS, GET_FRIENDS_LIST, GET_SENT_REQUESTS } from "../actionTypes/friendActionTypes";

const initialState = {
    isLoad: false,
    message: null,
    friendRequests: [],
    sentRequests: [],
    friendsList: [],
    error: null
};


// Reducer Pure Function
const friendReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FRIEND_LOAD: return { ...state, isLoad: true };

        case FRIEND_REQUEST_SUCCESS:
        case FRIEND_RESPONSE_SUCCESS: return { ...state, isLoad: false, message: payload };

        case FRIEND_REQUEST_FAIL:
        case FRIEND_RESPONSE_FAIL: return { ...state, isLoad: false, error: payload };
        
        case GET_FRIEND_REQUESTS: return { ...state, isLoad: false, friendRequests: payload };

        case GET_SENT_REQUESTS: return { ...state, isLoad: false, sentRequests: payload };

        case GET_FRIENDS_LIST: return { ...state, isLoad: false, friendsList: payload };

        default: return state;
    }
};


export default friendReducer;