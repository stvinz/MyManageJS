/*--------------------
      Home page
---------------------*/
import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';

import { nota } from '../../../../services';

function TableForm(){
    /*-----------------------
        Add Form Components
    ------------------------*/
    const textFieldStyle = { InputLabelProps: {shrink: true}, variant: "outlined", required: true, fullWidth: true };
    const initialValues = {id: '', dateCreated: '', name: '', total: ''};

    const initErr = {
        id: false,
        name: false,
        dateCreated: false,
        total: false
    };
    const [err, setErr] = useState(initErr);

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

    /*-------------------
        Table Contents
    --------------------*/
    const [content, upContent] = useState([{
        id: 1,
        dateCreated: new Date().toISOString(),
        name: "John",
        total: "AGKVS"
    }]);
    useEffect(() => {
        nota.get()
            .then((value) => upContent(value))
            .catch((err) => console.log(err))
    });

    return ( 
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No. Bon</TableCell>
                                <TableCell>Tanggal</TableCell>
                                <TableCell>Nama</TableCell>
                                <TableCell>Jumlah</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><Field component={TextField} label="No Bon" {...textFieldStyle} {...binder('id')} autoFocus /></TableCell>
                                <TableCell><Field component={TextField} label="Tanggal" type="date" {...textFieldStyle} {...binder('dateCreated')} /></TableCell>
                                <TableCell><Field component={TextField} label="Nama" {...textFieldStyle} {...err.name} {...binder('name')} /></TableCell>
                                <TableCell><Field component={TextField} label="Jumlah" {...textFieldStyle} {...err.total} {...binder('total')} /><input type="submit" style={{ display: "none" }} /></TableCell>
                            </TableRow>
                            {content.map((el) => 
                                <TableRow key={el.id}>
                                    <TableCell>{el.id}</TableCell>
                                    <TableCell>{el.dateCreated}</TableCell>
                                    <TableCell>{el.name}</TableCell>
                                    <TableCell>{el.total}</TableCell>
                                </TableRow> 
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Form>
        </Formik>
    );
}

export default TableForm;