// Necessary Imports
import axios from 'axios';
import { FRIEND_LOAD, FRIEND_REQUEST_FAIL, FRIEND_REQUEST_SUCCESS, FRIEND_RESPONSE_FAIL, FRIEND_RESPONSE_SUCCESS, GET_FRIEND_REQUESTS } from "../actionTypes/friendActionTypes";


//! Action Creators

// Send Friend Request
export const sendFriendRequest = (recipientId) => async (dispatch) => {
    dispatch({ type: FRIEND_LOAD });
    try {
        const config = {
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

//Get Friend Requests List
export const getFriendRequests = () => async (dispatch) => {
    dispatch({ type: FRIEND_LOAD });
    try {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
        const { data } = await axios.get('/api/friends/requests', config);
        dispatch({ type: GET_FRIEND_REQUESTS, payload: data.friendRequests })
    } catch (error) {
        dispatch({ type: FRIEND_REQUEST_FAIL, payload: error.response.data.message || error.message })
    }
};

// Respond Friend Request (Accept or Reject)
export const respondFriendRequest = (senderId, accept) => async (dispatch) => {
    dispatch({ type: FRIEND_LOAD });
    try {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
        const { data } = await axios.post('/api/friends/respond', { senderId, accept }, config);
        dispatch({ type: FRIEND_RESPONSE_SUCCESS, payload: data.message });
        dispatch(getFriendRequests())
    } catch (error) {
        dispatch({ type: FRIEND_RESPONSE_FAIL, payload: error.response.data.message || error.message })
    }
};