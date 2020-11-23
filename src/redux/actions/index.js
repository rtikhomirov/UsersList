import * as ActionTypes from "../ActionTypes";

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
});

export const updateUsersAfterDeletion = (users) => ({
    type: ActionTypes.USERS_AFTER_DELETION,
    payload: users
});

export const editUser = (user) => ({
    type: ActionTypes.EDIT_USER,
    payload: user
});