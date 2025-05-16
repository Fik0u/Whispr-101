// Necessary Imports

import { ADD_MESSAGE_CHAT, FAIL_CHAT, GET_MESSAGES_CHAT, LOAD_CHAT, RECEIVE_MESSAGE_CHAT, SET_RECEIVER_CHAT } from "../actionTypes/chatActionTypes";


const initialState = {
    isLoad: false,
    receiverId: null,
    messages: [],
    error: null
};


// Reducer Pure Function
const chatReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_CHAT : return { ...state, isLoad: true };

        case SET_RECEIVER_CHAT: return { ...state, receiverId: payload, messages: [] };

        case GET_MESSAGES_CHAT: return { ...state, isLoad: false, messages: payload };

        case ADD_MESSAGE_CHAT: return { ...state, isLoad: false, messages: [...state.messages, payload] };

        case RECEIVE_MESSAGE_CHAT: return { ...state, messages: [...state.messages, payload] };

        case FAIL_CHAT: return { ...state, isLoad: false, error: payload };
    
        default: return state;
    };
}

export default chatReducer;