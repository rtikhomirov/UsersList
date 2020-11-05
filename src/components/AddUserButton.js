import React, {useState}  from 'react';
import {Modal} from "reactstrap";
import UserForm from "./UserForm";
import Constants from "./Constants";

const AddUserButton = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const onHelpClick = () => {
        toggleModal();
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <React.Fragment>
            <button
                onClick={() => onHelpClick()}
                className="btn btn-secondary float-right">
                Add user
            </button>
            <Modal isOpen={modalOpen} toggle={toggleModal} centered={true}>
                <UserForm action={Constants.ADD_USER} toggleModal={toggleModal}/>
            </Modal>
        </React.Fragment>
    );
};

export default AddUserButton;