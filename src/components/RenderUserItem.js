import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import {deleteUser} from "../redux/ActionCreators";
import UserForm from "./UserForm";
import {Modal} from "reactstrap";
import Constants from "./Constants";

const RenderUserItem = ({user}) => {

    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const onEditClick = (userid) => {
        console.log('userId', userid);
        toggleModal();
    };

    const onDeleteClick = (userId) => {
        dispatch(deleteUser(userId));
    };

    return (
        <li className='list-group-item'>
            <div className='row'>
                <p className='col-2 centered'>{user.id}</p>
                <p className='col-6'>{user.name} {user.surname}</p>
                <button
                    className='col-2 btn btn-outline-primary float-left'
                    onClick={() => onEditClick(user.id)}>edit</button>
                <button
                    className='col-2 btn btn-outline-danger float-right'
                    onClick={() => onDeleteClick(user.id)}>delete</button>
            </div>
            <Modal isOpen={modalOpen} toggle={toggleModal} centered={true}>
                <UserForm action={Constants.EDIT_USER} toggleModal={toggleModal} currentUser={user}/>
            </Modal>
        </li>
    );
};
export default RenderUserItem;