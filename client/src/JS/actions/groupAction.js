// Necessary Imports
import axios from 'axios';
import { ADD_USER, CREATE_GROUP, FAIL_GROUP, GET_GROUPS, LOAD_GROUP, REMOVE_USER, SET_SELECTED_GROUP } from "../actionTypes/groupActionTypes";


//! Actions creators

// Create new group
export const createGroup = (groupData) => async (dispatch) => {
    dispatch({ type: LOAD_GROUP });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/groups', groupData, config);
        dispatch({ type: CREATE_GROUP, payload: data })
    } catch (error) {
        dispatch({ type: FAIL_GROUP, payload: error.message })
    }
};

// Fetch groups
export const getGroups = (userId) => async (dispatch) => {
    dispatch({ type: LOAD_GROUP });
    try {
        const { data } = await axios.get(`/api/groups/user/${userId}`);
        dispatch({ type: GET_GROUPS, payload: data.groups })
    } catch (error) {
        dispatch({ type: FAIL_GROUP, payload: error.message })
    }
};

// Add user to group
export const addUser = (groupId, userId) => async (dispatch) => {
    dispatch({ type: LOAD_GROUP });
    try {
        const { data } = await axios.post(`/api/groups/${groupId}/members`, { userId });
        dispatch({ type: ADD_USER, payload: data.group })
    } catch (error) {
        dispatch({ type: FAIL_GROUP, payload: error.message })
    }
};

// Remove user from a group
export const removeUser = (groupId, userId) => async (dispatch) => {
    dispatch({ type: LOAD_GROUP });
    try {
        const { data } = await axios.post(`/api/groups/${groupId}/removeMember`, userId);
        dispatch({ type: REMOVE_USER, payload: data.group })
    } catch (error) {
        dispatch({ type: FAIL_GROUP, payload: error.message })
    }
};

// Select a group
export const selectedGroup = (group) => (dispatch) => {
    dispatch({ type: SET_SELECTED_GROUP, payload: group })
};