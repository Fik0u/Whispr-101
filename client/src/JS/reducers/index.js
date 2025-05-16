import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import chatReducer from './chatReducer';



const rootReducer = combineReducers({ authReducer, chatReducer });


export default rootReducer;