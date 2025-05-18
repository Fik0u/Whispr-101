import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import chatReducer from './chatReducer';
import groupReducer from './groupReducer';
import { userReducer } from './userReducer';



const rootReducer = combineReducers({ authReducer, userReducer, chatReducer, groupReducer });


export default rootReducer;