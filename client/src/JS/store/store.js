import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "../reducers";
import { thunk } from 'redux-thunk';


// This file creates the Redux store and applies middleware to it. It also sets up the Redux DevTools extension if available.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store with the root reducer and apply middleware (thunk for async actions)
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;