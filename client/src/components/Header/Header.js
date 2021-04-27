import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/userAction';
import { Link, NavLink } from 'react-router-dom';
import SideDrawer from './SideDrawer/SideDrawer';
import './Header.css';
import { Fragment } from 'react';

const Header = props => {
	const [showDrawer, setShowDrawer] = useState(false);

	const drawerHandler = e => {
		e.preventDefault();
		setShowDrawer(!showDrawer);
	}

	const closeDrawerFunc = () => {
		setShowDrawer(false);
	}

	const logoutHandler = () => {
		props.logout();
	}

    return (
    <nav className="navbar-container">
		<SideDrawer show={showDrawer} close={closeDrawerFunc} logout={props.logout}/>
		<div className="nav">
			<button onClick={drawerHandler}>
				<span className="line"></span>
				<span className="line"></span>
				<span className="line"></span>
			</button>
			<ul>
				<li>
					<NavLink to={'/'} exact activeClassName={'active'}>
					<i className="fas fa-home"></i>
					Home</NavLink>
				</li>
				{props.isLogin ? (
					<Fragment>
						<li>
							<NavLink to={'/new-place'} activeClassName={'active'}>New Place</NavLink>
						</li>
						<li onClick={logoutHandler} className="nav-left">
							<NavLink to={'/'}>Logout</NavLink>
						</li>
					</Fragment>
				) : (
					<li className="nav-left">
						<NavLink to={'/register'} activeClassName={'active'}>Sign up</NavLink>
					</li>
				)}
			</ul>
		</div>
	</nav>
    )
}

const mapStateToProps = state => {
	return {
		isLogin: state.userReducer.isLogin
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logoutUser())
	}
} 

export default connect(mapStateToProps, mapDispatchToProps)(Header);