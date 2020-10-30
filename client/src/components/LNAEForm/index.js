/*-----------------------------------
    Layout - Nota Add Edit Form
-----------------------------------*/
import React from 'react';
import { Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { CButton, nameErrorBinder, CField } from '../../components';

function LNAEForm(props) {
    const binder = nameErrorBinder(props.error);

    return (
        <div>
            <Typography variant="h6" component="h6">{props.title}</Typography>
            <Formik initialValues={props.initialValues} onSubmit={props.handleSubmit}>
                <Form>
                    <CField label="No Bon" {...binder('id')} autoFocus />
                    <CField label="Tanggal" type="date" {...binder('dateCreated')} />
                    <CField label="Nama" {...binder('name')} />
                    <CField label="Jumlah" {...binder('total')} />
                    <CButton type="submit">{props.submitButton}</CButton>
                </Form>
            </Formik>
        </div>
    );
}

export default LNAEForm;