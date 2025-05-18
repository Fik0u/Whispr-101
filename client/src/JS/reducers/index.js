import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import chatReducer from './chatReducer';
import groupReducer from './groupReducer';
import { userReducer } from './userReducer';
import friendReducer from './friendReducer';



const rootReducer = combineReducers({ authReducer, userReducer, friendReducer, chatReducer, groupReducer });


export default rootReducer;