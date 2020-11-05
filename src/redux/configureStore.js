import {createStore, applyMiddleware} from 'redux';
import { Users } from './Users';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export const ConfigureStore = () => {
    const store = createStore(
        Users,
        applyMiddleware(thunk, logger)
    );
    return store;
};