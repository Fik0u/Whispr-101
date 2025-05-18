// Necessary Imports
import axios from 'axios';
import { FRIEND_LOAD, FRIEND_REQUEST_FAIL, FRIEND_REQUEST_SUCCESS, FRIEND_RESPONSE_FAIL, FRIEND_RESPONSE_SUCCESS } from "../actionTypes/friendActionTypes";


//! Action Creators

// Send Friend Request
export const sendFriendRequest = (recipientId) => async (dispatch) => {
    dispatch({ type: FRIEND_LOAD });
    try {
        let config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
        const { data } = await axios.post('/api/friends/send', { recipientId }, config);
        dispatch({ type: FRIEND_REQUEST_SUCCESS, payload: data.message })
    } catch (error) {
        dispatch({ type: FRIEND_REQUEST_FAIL, payload: error.response.data.message || error.message })
    }
};

// Respond Friend Request (Accept or Reject)
export const respondFriendRequest = (senderId, accept) => async (dispatch) => {
    dispatch({ type: FRIEND_LOAD });
    try {
        let config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
        const { data } = await axios.post('/api/friends/respond', { senderId, accept }, config);
        dispatch({ type: FRIEND_RESPONSE_SUCCESS, payload: data.message })
    } catch (error) {
        dispatch({ type: FRIEND_RESPONSE_FAIL, payload: error.response.data.message || error.message })
    }
};