// Necessary Imports
import axios from 'axios';
import { CURRENT_AUTH, FAIL_AUTH, LOAD_AUTH, LOGOUT_AUTH, SUCCESS_AUTH, UPDATE_PROFILE } from "../actionTypes/authActionTypes";


//! Action creators

//Register User
export const register = (newUser, navigate) => async (dispatch) => {
    dispatch({ type: LOAD_AUTH });
    try {
        const result = await axios.post('/api/auth/register', newUser);
        dispatch({ type: SUCCESS_AUTH, payload: result.data });
        navigate('/profile')
    } catch (error) {
        dispatch({ type: FAIL_AUTH, payload: error.response.data.errors });
    }
};

// Login User
export const login = (user, navigate) => async (dispatch) => {
    dispatch({ type: LOAD_AUTH });
    try {
        const result = await axios.post('/api/auth/login', user);
        dispatch({ type: SUCCESS_AUTH, payload: result.data });
        navigate('/')
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
export const logout = (navigate) => (dispatch) => {
    dispatch({ type: LOGOUT_AUTH });
    navigate('/')
};

//Update Profile
export const updateProfile = (formData) => async (dispatch) => {
    dispatch({ type: LOAD_AUTH });
    try {
        const { data } = await axios.put('/api/auth/update', formData, {
            headers: { 'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('token') }
        });
        dispatch({ type: UPDATE_PROFILE, payload: data.user});
        localStorage.setItem('user', JSON.stringify(data.user))
    } catch (error) {
        dispatch({ type: FAIL_AUTH, payload: error.response.data.errors || error.message });
    }
};