import * as ActionTypes from './ActionTypes';
import {baseUrl} from './baseUrl';

//---------GET_ALL_USERS_START
export const fetchUsers = () => (dispatch) => {
    dispatch(usersLoading(true));

    return fetch(baseUrl + 'users',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
};

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
//---------GET_ALL_USERS_END

//---------POST_USER_START
export const postUser = (firstName, lastName) => (dispatch) => {
    const newUser = {
        'name': firstName,
        'surname': lastName,
        'desc': 'empty description',
        'avatar': null
    };

    return fetch(baseUrl + 'users', {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(user => dispatch(addUser(user))
        )
        .catch(error => alert("Error at creation: "+ error.message));
};

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
});
//---------POST_USER_END

//---------DELETE_USER_START
export const deleteUser = (id) => (dispatch) => {
    return fetch(baseUrl + 'user/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(users => dispatch(updateUsersAfterDeletion(users)))
        .catch(error => alert("Error at deletion: "+ error.message));
};

export const updateUsersAfterDeletion = (users) => ({
    type: ActionTypes.USERS_AFTER_DELETION,
    payload: users
});

//---------DELETE_USER_END

//---------EDIT_USER_START
export const updateUser = (id, firstName, lastName) => (dispatch) => {
    const editableUser = {
        'name': firstName,
        'surname': lastName,
        'desc': 'empty description',
        'avatar': null
    };

    return fetch(baseUrl + 'user/' + id, {
        method: "PUT",
        body: JSON.stringify(editableUser),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(user => dispatch(editUser(user))
        )
        .catch(error => alert("Error at edition: "+ error.message));
};

export const editUser = (user) => ({
    type: ActionTypes.EDIT_USER,
    payload: user
});
//---------EDIT_USER_END
