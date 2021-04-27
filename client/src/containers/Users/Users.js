import React, { Fragment, useEffect, useState }  from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../store/actions/userAction';
import { clearRepos } from '../../store/actions/placeAction';
import UserItem from '../../components/UserItem/UserItem';
import Pagination from '../../components/UIElements/Pagination/Pagination';
import Spinner from '../../components/UIElements/Spinner/Spinner';
import './Users.css';

const Users = props => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(3);

    useEffect(() => {
        props.getAll();
        props.clear();
    }, []);

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = props.users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <Fragment>
            <div className={'title'}>
                {props.user && <h4 className={'username'}>{`Hi ${props.user.username}`}</h4>}
                <h2><i className="fas fa-map-marked-alt fa-lg"></i> My Place</h2>
                <small>"My place" is a free web application that allows to anyone create, store, and manage preferred places</small>
            </div>
            <ul className={'users-list'}>
                {props.users.length > 0 ? (
                    currentUsers.map(user => <UserItem
                        key={user._id}
                        id={user._id} 
                        image={user.avatar} 
                        name={user.username}
                        email={user.email}/>)
                ) : (
                    <div className={'center'}>
                        <Spinner />
                    </div>
                )}
            </ul>
            {props.users && <Pagination paginate={(page) => setCurrentPage(page)} totalUsers={props.users} userPerPage={usersPerPage}/>}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAll: () => dispatch(getUsers()),
        clear: () => dispatch(clearRepos())
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Users);