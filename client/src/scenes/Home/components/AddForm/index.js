/*-----------------------
    Add Form Components
------------------------*/
import React, { useState } from 'react';
import { Input } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';

import { nota } from '../../../../services';

function AddForm() {
    const textFieldStyle = { 
        InputLabelProps: {shrink: true}, 
        variant: "outlined", 
        required: true, 
        fullWidth: true 
    };
    const initialValues = {
        id: '', 
        dateCreated: '', 
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

    /*const AddModal = () => (
        <Modal open={op} onClose={cl}>
            <div style={modalStyle}>
                <p>Hello</p>
            </div>
        </Modal>
    );*/
    
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                <Field component={TextField} label="No Bon" {...textFieldStyle} {...binder('id')} autoFocus />
                <Field component={TextField} label="Tanggal" type="date" {...textFieldStyle} {...binder('dateCreated')} />
                <Field component={TextField} label="Nama" {...textFieldStyle} {...err.name} {...binder('name')} />
                <Field component={TextField} label="Jumlah" {...textFieldStyle} {...err.total} {...binder('total')} />
                <Input type="submit" />
            </Form>
        </Formik>
    );
}

export default AddForm;