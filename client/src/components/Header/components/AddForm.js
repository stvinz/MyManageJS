/*-----------------------
    Add Form Components
------------------------*/
import React, { useState } from 'react';
import { Button, Typography, IconButton, Divider, Box, makeStyles } from '@material-ui/core';
import { Formik, Field, Form, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { TextField as TextFieldOri } from '@material-ui/core';
import { Autocomplete } from 'formik-material-ui-lab';

import RemoveIcon from '@material-ui/icons/Remove';

import { CustModal } from '../../../components';
import { nota } from '../../../services';

const useStyles = makeStyles((theme) => ({
    textfield: {
        margin: "10px 0"
    }
}));

function AddForm(props) {
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

    const AddNota = () => {
        const initialValues = {
            id: '', 
            dateCreated: new Date().toISOString().substr(0, 10), 
            name: '', 
            total: ''
        };
        const initErr = {
            id: false,
            name: false,
            dateCreated: false,
            total: false
        };
        
        const handleSubmit = (values, { setSubmitting }) => {
            nota.add(values)
                .then((res) => {
                    console.log(res);
    
                    return setSubmitting(true);
                })
                .catch((err) => {
                    window.alert(err);
    
                    if (err.path) {
                        var changeErr = {
                            id: false,
                            name: false,
                            dateCreated: false,
                            total: false
                        };
                        changeErr[err.path] = true;
    
                        setErr(changeErr);
                    }
    
                    return setSubmitting(false);
                });
        };
        const [err, setErr] = useState(initErr);
        const binder = (name) => ({
            name: name,
            error: err[name]
        });

        return (
            <div>
                <Typography variant="h6" component="h6">Tambah bon baru</Typography>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <Field component={TextField} label="No Bon" {...textFieldStyle} {...binder('id')} autoFocus />
                        <Field component={TextField} label="Tanggal" type="date" {...textFieldStyle} {...binder('dateCreated')} />
                        <Field component={TextField} label="Nama" {...textFieldStyle} {...binder('name')} />
                        <Field component={TextField} label="Jumlah" {...textFieldStyle} {...binder('total')} />
                        <Button type="submit" variant="contained">Tambah</Button>
                    </Form>
                </Formik>
            </div>
        );
    };
    
    const AddKontra = () => {
        const initialValues = {
            dateCreated: new Date().toISOString().substr(0, 10), 
            name: '', 
            notaList: ['']
        };
        const initErr = {
            name: false,
            dateCreated: false,
            notaList: false
        };
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
                <Typography variant="h6" component="h6">Tambah kontra bon baru</Typography>
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
                                                    renderInput={(params) => <TextFieldOri className={classes.textfield} {...params} variant="outlined" label={"Bon " + (index + 1)} required/>}
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
                            <Button type="submit" variant="contained">Tambah</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    };
    
    return (
        <CustModal open={props.open} onClose={cl}>
            {props.path === "/home" ? AddNota() : AddKontra()}
        </CustModal>
    );
}

export default AddForm;