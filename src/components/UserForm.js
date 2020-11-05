import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { postUser, updateUser } from "../redux/ActionCreators";
import Constants from "./Constants";

const UserForm = ({action, toggleModal, currentUser}) => {

    const dispatch = useDispatch();

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const headerTitle = (action === Constants.ADD_USER) ? Constants.ADD_USER_HEADER : Constants.EDIT_USER_HEADER;

    useEffect(() => {
        if(action === Constants.EDIT_USER) {
            setName(currentUser.name);
            setSurname(currentUser.surname);
        }
    }, []);


    useEffect(() => {
        (name !== '' && surname !== '') ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    }, [name, surname]);

    const handleSubmit = () => {
        toggleModal();
        switch (action) {
            case Constants.ADD_USER:
                dispatch(postUser(name, surname));
                break;
            case Constants.EDIT_USER:
                dispatch(updateUser(currentUser.id, name, surname));
                break;
            default:
                alert( "There is no such action" );
        }
    };

    return (
        <div className="card">
            <div className="card-header">{headerTitle}</div>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter surname"
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
            </div>
            <div className="card-footer">
                <button
                    className="btn btn-secondary centered"
                    disabled={isButtonDisabled}
                    onClick={() => handleSubmit()}
                >save</button>
            </div>
        </div>
    );
};
export default UserForm;