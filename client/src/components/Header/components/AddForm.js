/*-----------------------
    Add Form Components
------------------------*/
import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';

import { CustModal } from '../../../components';
import { nota } from '../../../services';

function AddForm(props) {
    const textFieldStyle = { 
        InputLabelProps: {shrink: true}, 
        variant: "outlined", 
        required: true, 
        fullWidth: true,
        style: {
            margin: "15px 0px"
        }
    };
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
    const binder = (name) => ({
        name: name,
        error: err[name]
    });
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
    
    const cl = () => props.onClose();
    
    return (
        <CustModal open={props.open} onClose={cl}>
            <Typography variant="h6" component="h6">Tambah bon baru</Typography>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <Field component={TextField} label="No Bon" {...textFieldStyle} {...binder('id')} autoFocus />
                    <Field component={TextField} label="Tanggal" type="date" {...textFieldStyle} {...binder('dateCreated')} />
                    <Field component={TextField} label="Nama" {...textFieldStyle} {...err.name} {...binder('name')} />
                    <Field component={TextField} label="Jumlah" {...textFieldStyle} {...err.total} {...binder('total')} />
                    <Button type="submit" variant="contained">Tambah</Button>
                </Form>
            </Formik>
        </CustModal>
    );
}

export default AddForm;