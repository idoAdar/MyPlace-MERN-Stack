import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions/placeAction';
import { Link } from 'react-router-dom';
import Modal from '../UIElements/Modal/Modal';
import Map from '../UIElements/Map/Map';

import './Place.css';

const Place = props => {
    const [modalMap, setModalMap] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const openModalMap = () => setModalMap(true);

    const closeModalMap = () => setModalMap(false);

    const openModalDelete = () => setModalDelete(true);

    const closeModalDelete = () => setModalDelete(false);

    const defaultImg = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png';

    return (
        <Fragment>
            <Modal show={modalMap} 
                header={props.item.address}
                height={'36vh'}
                footer={<button className={'lightGreen'} onClick={closeModalMap}>Close</button>}
            >
                <div className="map-container">
                    <Map center={props.item.location} zoom={10}/>
                </div>
            </Modal>
            <Modal show={modalDelete}
                header={'Notice!'}
                height={'20vh'}
                footer={<Fragment>
                    <button onClick={closeModalDelete} className={'lightGreen'}>Cancel</button>
                    <button onClick={() => props.delete(props.item._id, closeModalDelete)} className={'red'}>Remove</button>
                </Fragment>}
            >
                <div style={{ padding: '1rem' }}>
                    <p>Are you sure you want to remove this Place? Please not that this action cannot be undone therafter</p>
                </div>
            </Modal>
            <div className="place-card">
                <div>
                    <img src={props.item.image || defaultImg} alt={props.item.title}/>
                </div>
                <div className={'place-content'} style={{padding: '1rem'}}>
                    <h2>{props.item.title}</h2>
                    <p>{props.item.description}</p>
                    <p>{props.item.address}</p>
                    <hr />
                    <div className="place-buttons">
                        <button onClick={openModalMap} className="green">MAP</button>
                        {props.user ? (props.user.userId === props.item.user && (
                            <Fragment>
                                <Link to={{ pathname: `/edit/${props.item._id}`, state: { title: props.item.title, description: props.item.description } }}>
                                    <button className="lightGreen">Edit</button>                            
                                </Link>
                                <button onClick={openModalDelete} className="red">Remove</button>
                            </Fragment>
                        )) : null}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delete: (id, cb) => dispatch(deletePlace(id, cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Place);