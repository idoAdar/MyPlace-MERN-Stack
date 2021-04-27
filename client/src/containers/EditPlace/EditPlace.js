import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { editPlace } from '../../store/actions/placeAction';
import InputElement from '../../components/InputElement/InputElement';
import './EditPlace.css';

const EditPlace = props => {
    const [formState, setFormState] = useState({
        title: props.location.state.title,
        description: props.location.state.description,
        titleErr: null,
        descriptionErr: null,
    });

    const { title, description } = formState;

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
        
        if (title === '') titleErr = 'Title is required'; 
        if (description === '') descriptionErr = 'Description is required'; 

        if (titleErr || descriptionErr) {
            setFormState(prevState => {
                return {
                    ...prevState,
                    titleErr,
                    descriptionErr,
                }
            })
            return false;
        }
        return true;
    }

    const editPlaceHandler = e => {
        e.preventDefault();
        const isVaild = validator();
        if (isVaild) {
            const params = props.match.params.placeId;
            props.send(formState, params, props.history);
        }
    }

    return (
        <Fragment>
            <form onSubmit={(e) => editPlaceHandler(e)} className={'edit-place-form'}>
                <h1>Edit Place</h1>
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
                <div style={{margin: '1rem auto'}}>
                    <button type={'submit'}>Save</button>
                </div>
            </form>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        send: (data, id, history) => dispatch(editPlace(data, id, history))
    }
}

export default connect(null, mapDispatchToProps)(EditPlace);