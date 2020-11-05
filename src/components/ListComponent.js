import React, {useState} from 'react';
import {Loading} from "./LoadingComponent";
import RenderUserItem from "./RenderUserItem";
import Pagination from "./Pagination";
import Constants from "./Constants";
import AddUserButton from "./AddUserButton";

const ListComponent = ({users, usersLoading, usersErrMess}) => {

    const usersPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [firstShownPage, setFirstShownPage] = useState(1);

    const onArrowBtnClick = (e) => {
        let toPage;
        console.log('onLeftArrowClick : ' + e.target.id);
        switch(e.target.id){
            case 'leftArrow':
                toPage = Math.max(
                    1,
                    firstShownPage - Constants.MAX_PAGER_BUTTONS_NUMBER
                );
                break;
            case 'rightArrow':
                toPage = Math.min(
                    firstShownPage + Constants.MAX_PAGER_BUTTONS_NUMBER,
                    Math.ceil(users.length / usersPerPage) - (Constants.MAX_PAGER_BUTTONS_NUMBER - 1)
                );
                break;
            default :
                break;
        }
        setFirstShownPage(toPage);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const usersList = currentUsers.map((user) =>
        <ul key={user.id} className='list-group'>
            <RenderUserItem user={user}/>
        </ul>
    );

    const RenderList = ({isLoading, errMess}) => {
        if (isLoading) {
            return(
                <Loading />
            );
        } else if (errMess) {
            return(
                <h4>{errMess}</h4>
            );
        } else {
            return(
                <div className='card mx-auto' style={{width : '80%'}}>
                    <div className='card-header'>
                        <span>Users list</span>
                        <AddUserButton/>
                    </div>
                    <div className='card-body'>
                        {usersList}
                    </div>
                    <Pagination
                        usersPerPage={usersPerPage}
                        totalUsers={users.length}
                        selectedPage={currentPage}
                        firstShownPage={firstShownPage}
                        onPageClick={(clickedPageNumber) => setCurrentPage(clickedPageNumber)}
                        onArrowClick={(e) => onArrowBtnClick(e)}
                    />
                </div>
            )
        }
    };

    return (
        <div className="container">
            <RenderList isLoading={usersLoading} errMess={usersErrMess}/>
        </div>
    );
};
export default ListComponent;