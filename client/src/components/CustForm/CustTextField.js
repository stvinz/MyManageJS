import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

function CustTextField(props) {
    const textFieldStyle = { 
        InputLabelProps: {shrink: true}, 
        variant: "outlined", 
        required: true, 
        fullWidth: true,
        style: {
            margin: "15px 0px"
        }
    };

    return (
        <Field component={TextField} {...textFieldStyle} {...props} />
    );
}

export default CustTextField;