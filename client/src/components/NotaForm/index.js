import React from 'react';
import { Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { CustButton, nameErrorBinder, CustTextField } from '../CustForm';

function NotaForm(props) {
    const binder = nameErrorBinder(props.error);

    return (
        <div>
            <Typography variant="h6" component="h6">{props.title}</Typography>
            <Formik initialValues={props.initialValues} onSubmit={props.handleSubmit}>
                <Form>
                    <CustTextField label="No Bon" {...binder('id')} autoFocus />
                    <CustTextField label="Tanggal" type="date" {...binder('dateCreated')} />
                    <CustTextField label="Nama" {...binder('name')} />
                    <CustTextField label="Jumlah" {...binder('total')} />
                    <CustButton type="submit">{props.submitButton}</CustButton>
                </Form>
            </Formik>
        </div>
    );
}

export default NotaForm;