// Necessary Imports
import axios from 'axios';
import { USER_FAIL, USER_LOAD, USER_SUCCESS } from "../actionTypes/userActionTypes";


//! Action Creators

// Search Users
export const searchUsers = (query) => async (dispatch) => {
    dispatch({ USER_LOAD });
    try {
        const { data } = await axios.get(`/api/users/search?query=${query}`);
        dispatch({ type: USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_FAIL, payload: error.response.data.message || error.message })
    }
};