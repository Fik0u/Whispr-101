// Necessary Imports 

import { ADD_USER, CLEAR_SELECTED_GROUP, CREATE_GROUP, FAIL_GROUP, GET_GROUP_MESSAGES, GET_GROUPS, LOAD_GROUP, REMOVE_USER, SEND_MESSAGE, SET_SELECTED_GROUP } from "../actionTypes/groupActionTypes";


const initialState = {
    isLoad: false,
    groups: [],
    selectedGroup: null,
    groupMessages: {},
    error: null
};


// Reducer Pure Function
const groupReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_GROUP: return { ...state, isLoad: true };

        case CREATE_GROUP: return { ...state, isLoad: false, groups: [...state.groups, payload]};

        case GET_GROUPS: return { ...state, isLoad: false, groups: payload };

        case ADD_USER:
        case REMOVE_USER: return { ...state, isLoad: false, groups: state.groups.map(group => group._id === payload._id ? payload : group) };

        case SET_SELECTED_GROUP: return { ...state, selectedGroup: payload };

        case GET_GROUP_MESSAGES: return { ...state, isLoad: false, groupMessages: { ...state.groupMessages, [payload.groupId]: payload.messages } };

        case SEND_MESSAGE: return { ...state, isLoad: false, selectedGroup: { ...state.selectedGroup, messages: [...(state.selectedGroup?.messages || []), payload]}};

        case CLEAR_SELECTED_GROUP: return { ...state, selectedGroup: null };

        case FAIL_GROUP: return { ...state, isLoad: false, error: payload };
    
        default:return state;
    }
};


export default groupReducer;