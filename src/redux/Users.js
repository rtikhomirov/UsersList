import * as ActionTypes from './ActionTypes';

export const Users = (state = { isLoading: true, errMess: null, users:[]}, action) => {
    switch (action.type) {
        case ActionTypes.USERS_LOADING:
            return {...state, isLoading: true, errMess: null, users: []};

        case ActionTypes.ADD_USERS:
            return {...state, isLoading: false, errMess: null, users: action.payload};

        case ActionTypes.USERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_USER:
            return {...state, users: [...state.users, action.payload]};

        case ActionTypes.USERS_AFTER_DELETION:
            return {...state, users: action.payload};

        case ActionTypes.EDIT_USER:
            let updatedObjects = state.users.map((item) => {
                return item.id === action.payload.id ? action.payload : item;
            });
            return {...state, users: updatedObjects};

        default:
            return state;
    }
};