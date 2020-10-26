/*-------------------------
    Edit Form Components
--------------------------*/
import React, { useState } from 'react';
import { Button, IconButton, Divider, Box, makeStyles } from '@material-ui/core';
import { Formik, Field, Form, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { TextField as TextFieldOri } from '@material-ui/core';
import { Autocomplete } from 'formik-material-ui-lab';

import RemoveIcon from '@material-ui/icons/Remove';


const useStyles = makeStyles((theme) => ({
    textfield: {
        margin: "10px 0"
    }
}));

function EditForm(props) {
    const classes = useStyles();

    const textFieldStyle = { 
        InputLabelProps: {shrink: true}, 
        variant: "outlined", 
        required: true, 
        fullWidth: true,
        style: {
            margin: "15px 0px"
        }
    };
    const cl = () => props.onClose();

    const allNota = [{
        id: 1,
        dateCreated: new Date().toISOString(),
        name: "John",
        total: "AGKVS"
    },
    {
        id: 2,
        dateCreated: new Date().toISOString(),
        name: "Caca",
        total: "AGKSS"
    }];
    
    const initialValues = {
        dateCreated: props.data.dateCreated.substr(0, 10), 
        name: props.data.name, 
        notaList: [allNota[0], allNota[1]]
    };
    const initErr = {
        name: false,
        dateCreated: false,
        notaList: false
    };
    
    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    };
    const [err, setErr] = useState(initErr);
    const binder = (name) => ({
        name: name,
        error: err[name]
    });

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({values}) => (
                        <Form>
                            <Field component={TextField} label="Nama" {...textFieldStyle} {...binder('name')} />
                            <Field component={TextField} label="Tanggal" type="date" {...textFieldStyle} {...binder('dateCreated')} />
                            <FieldArray name="notaList">
                                {(arrayHelpers) => (
                                    <div>
                                        { values.notaList && values.notaList.length > 0 && values.notaList.map((elNota, index) => (
                                            <Box display="flex" key={index}>
                                                <Field name={'notaList.' + index} component={Autocomplete} options={allNota} 
                                                    getOptionSelected={(option, value) => (option.id === value.id) || (value === '')}
                                                    getOptionLabel={(option) => (option ? (option.id + " - "+ option.name + " " + option.total) : "")}
                                                    renderInput={(params) => <TextFieldOri className={classes.textfield} {...params} variant="outlined" label={"Bon " + (index + 1)} required />}
                                                    autoHighlight
                                                    fullWidth
                                                />
                                                { values.notaList.length === 1 
                                                ? null
                                                : (<IconButton onClick={() => arrayHelpers.remove(index)}>
                                                    <RemoveIcon />
                                                </IconButton>)}
                                                
                                                { index + 1 === values.notaList.length 
                                                ? <Button onClick={() => arrayHelpers.push('')}>Tambah Bon</Button> 
                                                : null}
                                            </Box>
                                        ))}
                                    </div>
                                )}
                            </FieldArray>
                            <Divider />
                            <Button type="submit" variant="contained">Edit</Button>
                        </Form>
                    )}
                </Formik>
        </div>
    );
}

export default EditForm;