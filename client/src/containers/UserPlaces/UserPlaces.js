import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserPlaces } from '../../store/actions/placeAction';
import Place from '../../components/Place/Place';
import './UserPlaces.css';

const UserPlaces = props => {
    useEffect(() => {
        const userId = props.match.params.userId;
        props.get(userId);
    }, []);

    return (
        <Fragment>
            {props.userPlaces.length > 0 ? (
                props.userPlaces.map(place => {
                    return (
                        <div key={place._id}>
                            <Place item={place} />
                        </div>
                    )
                })
            ) : <p className={'no-places-note'}>No places for this user</p>}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        userPlaces: state.placeReducer.userPlaces
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get: (id) => dispatch(getUserPlaces(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaces);