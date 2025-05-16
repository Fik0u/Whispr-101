import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import chatReducer from './chatReducer';
import groupReducer from './groupReducer';



const rootReducer = combineReducers({ authReducer, chatReducer, groupReducer });


export default rootReducer;