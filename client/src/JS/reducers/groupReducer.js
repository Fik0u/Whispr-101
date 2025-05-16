// Necessary Imports 

import { ADD_USER, CREATE_GROUP, FAIL_GROUP, GET_GROUPS, LOAD_GROUP, REMOVE_USER, SET_SELECTED_GROUP } from "../actionTypes/groupActionTypes";


const initialState = {
    isLoad: false,
    groups: [],
    selectedGroup: null,
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

        case FAIL_GROUP: return { ...state, isLoad: false, error: payload };
    
        default:return state;
    }
};


export default groupReducer;