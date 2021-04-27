import React from 'react';

const InputElement = props => {
    let element = <textarea rows={6}
                    placeholder={props.placeholder}
                    onChange={props.update}
                    value={props.value}
                    name={props.name}
                    className={'textareaE'}/>
    if (props.type) {
        element = <input type={props.type} 
                    placeholder={props.placeholder} 
                    onChange={props.update} 
                    value={props.value}
                    name={props.name}
                    className={'inputE'}/>
    }

    return (
        <div>
            {element}
            <small className={'err'}>{props.err}</small>
        </div>
    )
}

export default InputElement;