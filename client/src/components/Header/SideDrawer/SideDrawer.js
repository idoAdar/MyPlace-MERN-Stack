import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';
import './SideDrawer.css';

const SideDrawer = props => {
    return (
        <CSSTransition in={props.show} timeout={250} classNames="slide-in-left" mountOnEnter unmountOnExit>
            <aside onClick={props.close} className='drawer'>
                <div className='position-links-drawer'>
                    <ul>
                        <li>   
                            <h1><i className="fas fa-map-marked-alt fa-lg"></i> MyPlace</h1>	
                        </li>
                        <li>
                            <NavLink to={'/'} exact ><i className="fas fa-home"></i>
                            Home</NavLink>
                        </li>
                        {!props.isLogin ? (
                            <li>
                                <NavLink to={'/register'} >Sign up</NavLink>
                            </li>
                        ) : (
                            <Fragment>
                                <li>
                                    <NavLink to={'/new-place'} >New Place</NavLink>
                                </li>
                                <li onClick={props.logout}>
                                    <NavLink to={'/'}>Logout</NavLink>
                                </li>
                            </Fragment>
                        )}
                    </ul>
                </div>
            </aside>
        </CSSTransition>
    )
}

const mapStateToProps = state => {
    return {
        isLogin: state.userReducer.isLogin
    }
}

export default connect(mapStateToProps, null)(SideDrawer);