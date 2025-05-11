// Necessary Imports
import axios from 'axios';
import { CURRENT_AUTH, FAIL_AUTH, LOAD_AUTH, LOGOUT_AUTH, SUCCESS_AUTH } from "../actionTypes/authActionTypes";


//! Action creators

//Register User
export const register = (newUser) => async (dispatch) => {
    dispatch({ type: LOAD_AUTH });
    try {
        const result = await axios.post('/api/auth/register', newUser);
        dispatch({ type: SUCCESS_AUTH, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_AUTH, payload: error.response.data.errors });
    }
};

// Login User
export const login = (user) => async (dispatch) => {
    dispatch({ type: LOAD_AUTH });
    try {
        const result = await axios.post('/api/auth/login', user);
        dispatch({ type: SUCCESS_AUTH, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_AUTH, payload: error.response.data.errors });
    }
};

//Current User
export const currentUser = () => async (dispatch) => {
    dispatch({ type: LOAD_AUTH });
    try {
        let config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
        const result = await axios.get("/api/auth/current", config)
        dispatch({ type: CURRENT_AUTH, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_AUTH, payload: error.response.data.errors });
    }
};

// Logout User
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT_AUTH });
};