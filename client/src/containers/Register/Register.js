import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { newUser, spinnerFunc } from '../../store/actions/userAction';
import { Link } from 'react-router-dom';
import InputElement from '../../components/InputElement/InputElement';
import Spinner from '../../components/UIElements/Spinner/Spinner';
import './Register.css';

const initState = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    usernameErr: '',
    emailErr: '',
    passwordErr: '',
    confirmErr: '' 
}

const Register = props => {
    const [formState, setformState] = useState(initState);

    const { username, email, password, confirm } = formState;

    const updateState = e => {
        setformState(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const validator = () => {
        let usernameErr = null;
        let emailErr = null;
        let passwordErr = null;
        let confirmErr = null;
        
        if (username === '') usernameErr = 'Username is required'; 
        if (email === '' || !email.includes('@')) emailErr = 'Valid email is required';
        if (password.length <= 5) passwordErr = 'Password must be at least 6 characters long';
        if (confirm !== password) confirmErr = 'Password must be match';

        if (usernameErr || emailErr || passwordErr || confirmErr) {
            setformState(prevState => {
                return {
                    ...prevState,
                    usernameErr,
                    emailErr,
                    passwordErr,
                    confirmErr
                }
            })
            return false;
        }
        return true;
    }

    const registerHandler = e => {
        e.preventDefault();
        const isValid = validator();
        if (isValid) {
            props.loading();
            props.send(formState, props.history);
            setformState(initState);
        }
    }

    return (
        <Fragment>
            <form onSubmit={(e) => registerHandler(e)} className={'register-form'}>
                <div className={'register-header'}>
                    <h1><i className="fas fa-user-plus"></i> Sign Up</h1>
                    {props.isLoading && <Spinner />}
                </div>
                {props.error && <small>{props.error.message}</small>}
                <InputElement type={'text'}
                    update={updateState}
                    value={username}
                    placeholder={'Username'}
                    err={formState.usernameErr}
                    name={'username'}/>
                <InputElement type={'email'}
                    update={updateState}
                    value={email}
                    placeholder={'Email'}
                    err={formState.emailErr}
                    name={'email'}/>
                <InputElement type={'password'}
                    update={updateState}
                    value={password}
                    placeholder={'Password'}
                    err={formState.passwordErr}
                    name={'password'}/>
                <InputElement type={'password'}
                    update={updateState}
                    value={confirm}
                    placeholder={'Confirm'}
                    err={formState.confirmErr}
                    name={'confirm'}/>
                <div style={{margin: '0 auto'}}>
                    <button type={'submit'}>Register</button>
                </div>
                <p>Already have account? <Link to={'/login'}>Login</Link></p>
            </form>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        error: state.userReducer.error,
        isLoading: state.userReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        send: (data, history) => dispatch(newUser(data, history)),
        loading: () => dispatch(spinnerFunc())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);