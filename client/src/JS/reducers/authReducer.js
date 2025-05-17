// Necessary Imports

import { CURRENT_AUTH, FAIL_AUTH, LOAD_AUTH, LOGOUT_AUTH, SUCCESS_AUTH, UPDATE_PROFILE } from "../actionTypes/authActionTypes";



const initialState = {
    isLoad: false,
    user: {},
    token: null,
    isAuth: false,
    errors: [],
    success: []
};


// Reducer pure function
const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_AUTH: return { ...state, isLoad: true };

        case SUCCESS_AUTH: 
        localStorage.setItem('token', payload.token)
        return { ...state, isLoad: false, user: payload.user, isAuth: true, success: payload.success };

        case FAIL_AUTH: return { ...state, isLoad: false, errors: payload };

        case CURRENT_AUTH: return { ...state, isLoad: false, user: payload, isAuth: true };

        case UPDATE_PROFILE: return { ...state, user: payload, errors: [] };

        case LOGOUT_AUTH: 
        localStorage.removeItem('token');
        return { isLoad: false, user: {}, isAuth: false, errors: [], success: [] };
    
        default: return state;
    }
};



export default authReducer;