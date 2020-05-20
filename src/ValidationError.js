import React from 'react';
import './ValidationError.css'

export default function ValidationError(props) {
    if(props.message) {
        return (
            <div className='error'>{props.message}</div>
        );
    }
    return <></>
}

// To display a validation message requires requires a conditional statement

// create a component named ValidationError that accepts a property called message

//if message is a string, display the message, otherwise if
// it is undefined return an empty fragment

//use this new component on the form (directly below the input element)