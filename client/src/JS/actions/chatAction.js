// Necessary Imports
import axios from 'axios';
import { ADD_MESSAGE_CHAT, FAIL_CHAT, GET_MESSAGES_CHAT, LOAD_CHAT, RECEIVE_MESSAGE_CHAT, SET_RECEIVER_CHAT } from "../actionTypes/chatActionTypes";



//! Action creators

// Set The Receiver User 
export const setReceiver = (userId) => ({
    type: SET_RECEIVER_CHAT, payload: userId
});

// Get History Chat
export const getMessages = (senderId, receiverId) => async (dispatch) => {
    dispatch({ type: LOAD_CHAT });
    try {
        const result = await axios.get(`/api/messages/${senderId}/${receiverId}`);
        dispatch({ type: GET_MESSAGES_CHAT, payload: result.data })
    } catch (error) {
        dispatch({ type: FAIL_CHAT, payload: error.message})
    }
};

// Send Message
export const addMessage = (messageData) => async (dispatch) => {
    dispatch({ type: LOAD_CHAT });
    try {
        await axios.post('/api/messages', messageData);
        dispatch({ type: ADD_MESSAGE_CHAT, payload: messageData })
    } catch (error) {
        dispatch({ type: FAIL_CHAT, payload: error.message })
    }
};

// Receive a Message From User
export const receiveMessage = (messageData) => ({
    type: RECEIVE_MESSAGE_CHAT, payload: messageData
});