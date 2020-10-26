import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { nota } from '../../../../../services';

function EditForm(props) {
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
        id: props.data.id, 
        dateCreated: props.data.dateCreated.substring(0, 10), 
        name: props.data.name, 
        total: props.data.total
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
        nota.edit(values)
            .then((res) => {
                console.log(res);

                setSubmitting(true)

                return props.onClose();
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

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <Field component={TextField} label="No Bon" {...textFieldStyle} {...binder('id')} autoFocus />
                    <Field component={TextField} label="Tanggal" type="date" {...textFieldStyle} {...binder('dateCreated')} />
                    <Field component={TextField} label="Nama" {...textFieldStyle} {...binder('name')} />
                    <Field component={TextField} label="Jumlah" {...textFieldStyle} {...binder('total')} />
                    <Button type="submit" variant="contained">Edit</Button>
                </Form>
            </Formik>
        </div>
    );
}

export default EditForm;