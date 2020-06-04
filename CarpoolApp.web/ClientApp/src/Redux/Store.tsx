import {createStore} from 'redux';
import {rootReducer} from './Reducers/rootReducer'
const redux = require('redux')
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware))