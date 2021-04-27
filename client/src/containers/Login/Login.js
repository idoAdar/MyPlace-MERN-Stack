import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { loginUser, spinnerFunc } from '../../store/actions/userAction';
import { Link } from 'react-router-dom';
import InputElement from '../../components/InputElement/InputElement';
import Spinner from '../../components/UIElements/Spinner/Spinner';
import './Login.css';

const initState = {
        email: '',
        password: '',
        emailErr: null,
        passwordErr: null
}

const Login = props => {
    const [formState, setFormState] = useState(initState);

    const { email, password } = formState;

    const updateState = e => {
        setFormState((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const validator = () => {
        let emailErr = null;
        let passwordErr = null;
        
        if (email === '' || !email.includes('@')) emailErr = 'Valid email is required'; 
        if (password.length < 6) passwordErr = 'Password must be at least 6 characters long';  

        if (emailErr || passwordErr) {
            setFormState(prevState => {
                return {
                    ...prevState,
                    emailErr,
                    passwordErr
                }
            })
            return false;
        }
        return true;
    }

    const loginHandler = e => {
        e.preventDefault();
        const isVaild = validator();
        if (isVaild) {
            props.loading();
            props.send(formState, props.history);
            setFormState(initState);
        }
    }

    return (
        <Fragment>
            <form onSubmit={(e) => loginHandler(e)} className={'login-form'}>
                <div className={'login-header'}>
                    <h1><i className="fas fa-sign-in-alt"></i> Login</h1>
                    {props.isLoading && <Spinner />}
                </div>
                {props.error && <small>{props.error.message}</small>}
                <InputElement type={'text'} 
                    update={updateState} 
                    value={email}
                    err={formState.emailErr}
                    placeholder={'Email'} 
                    name={'email'}/>
                <InputElement type={'password'} 
                    update={updateState} 
                    value={password}
                    err={formState.passwordErr}
                    placeholder={'Password'} 
                    name={'password'}/>
                <div style={{margin: '0 auto'}}>
                    <button type={'submit'}>Login</button>
                </div>
                <p>Don't have account yet? <Link to={'/register'}>Register</Link></p>
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
        send: (data, history) => dispatch(loginUser(data, history)),
        loading: () => dispatch(spinnerFunc())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);