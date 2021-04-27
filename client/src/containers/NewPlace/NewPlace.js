import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { postPlace } from '../../store/actions/placeAction';
import InputElement from '../../components/InputElement/InputElement';
import Spinner from '../../components/UIElements/Spinner/Spinner';
import './NewPlace.css';

const initState = {
        title: '',
        description: '',
        address: '',
        image: '',
        descriptionErr: null,
        addressErr: null,
        imageErr: null,
}

const NewPlace = props => {
    const [formState, setFormState] = useState(initState);
    const [spinnerState, setSpinnerState] = useState(false);

    const { title, description, address, image } = formState;

    const updateState = e => {
        setFormState((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const validator = () => {
        let titleErr = null;
        let descriptionErr = null;
        let addressErr = null;
        let imageErr = null;
        
        if (title === '') titleErr = 'Title is required'; 
        if (description === '') descriptionErr = 'Description is required'; 
        if (address === '') addressErr = 'Address is required';
        if (image === '') imageErr = 'Image is required';

        if (titleErr || descriptionErr || addressErr || imageErr) {
            setFormState(prevState => {
                return {
                    ...prevState,
                    titleErr,
                    descriptionErr,
                    addressErr,
                    imageErr,
                }
            })
            return false;
        }
        return true;
    }

    const newPlaceHandler = e => {
        e.preventDefault();
        const isVaild = validator();
        if (isVaild) {
            setSpinnerState(true);
            setFormState(initState);
            props.send(formState, props.history);
        }
    }

    return (
        <Fragment>
            <form onSubmit={(e) => newPlaceHandler(e)} className={'new-place-form'}>
                <div className={'new-place-header'}>
                    <h1><i className="fas fa-plus-square"></i> Create New Place</h1>
                    {spinnerState && <Spinner />}
                </div>
                <InputElement type={'text'} 
                    update={updateState} 
                    value={title}
                    err={formState.titleErr}
                    placeholder={'Title'} 
                    name={'title'}/>
                <InputElement update={updateState} 
                    value={description}
                    err={formState.descriptionErr}
                    placeholder={'Description'} 
                    name={'description'}/>
                <InputElement type={'text'} 
                    update={updateState} 
                    value={address}
                    err={formState.addressErr}
                    placeholder={'Address'} 
                    name={'address'}/>
                <InputElement type={'text'}
                    update={updateState}
                    value={image}
                    err={formState.imageErr}
                    placeholder={'Image Url'}
                    name={'image'}/>
                <div style={{margin: '1rem auto'}}>
                    <button type={'submit'}>Create New Place</button>
                </div>
            </form>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        send: (data, history) => dispatch(postPlace(data, history))
    }
}

export default connect(null, mapDispatchToProps)(NewPlace);