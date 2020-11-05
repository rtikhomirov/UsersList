import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchUsers } from '../redux/ActionCreators';
import ListComponent from "./ListComponent";

const mapStateToProps = state => {
    return {
        users: state.users
    }
};

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
});


class MainComponent extends Component{
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        return (
            <div className="container">
                <ListComponent
                    users={this.props.users}
                    usersLoading={this.props.users.isLoading}
                    usersErrMess={this.props.users.errMess}
                />
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);