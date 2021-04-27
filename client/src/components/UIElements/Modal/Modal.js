import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from './Backdrop';
import './Modal.css';

const ModalOverlay = props => {
    const content = (
        <div style={{ height: props.height }} className={'modal'}>
            <header className={'modal-header'}>
                <h2>{props.header}</h2>
            </header>
            <div className={'modal-middle'}>
                {props.children}
            </div>
            <footer className={'modal-content-actions'}>
                {props.footer}
            </footer>
        </div>
    )
    return ReactDOM.createPortal(content, document.getElementById('modal'));
}

const Modal = props => {
    return (
        <Fragment>
            {props.show && <Backdrop/>}
            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames={'modal'}>
                <ModalOverlay {...props}/>
            </CSSTransition>
        </Fragment>
    )
}

export default Modal;