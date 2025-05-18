// Necessary Imports
import { USER_FAIL, USER_LOAD, USER_SUCCESS } from "../actionTypes/userActionTypes";



// Reducer Pure Function
export const userReducer = (state = { isLoad: false, users: [] }, { type, payload }) => {
    switch (type) {
        case USER_LOAD: return { isLoad: true, users: [] };
        
        case USER_SUCCESS: return { isLoad: false, users: payload };

        case USER_FAIL: return { isLoad: false, error: payload }
    
        default: return state;
    }
};