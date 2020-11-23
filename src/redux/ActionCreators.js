import {baseUrl} from './baseUrl';
import {usersLoading, addUsers, usersFailed, addUser, updateUsersAfterDeletion, editUser} from './actions';

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
//---------EDIT_USER_END
