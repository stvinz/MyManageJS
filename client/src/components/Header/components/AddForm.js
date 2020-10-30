/*-----------------------
    Add Form Components
------------------------*/
import React, { useState } from 'react';

import { CModal, LNAEForm, LKAEForm } from '../../../components';
import { nota } from '../../../services';

function AddForm(props) {
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
        const handleSubmit = (values, { setSubmitting, resetForm }) => {
            nota.add(values)
                .then(() => {
                    window.alert("Berhasil tambah bon baru!");
                    
                    resetForm();
                    return setSubmitting(false);
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
            <LNAEForm 
                title="Tambah Bon Baru" 
                submitButton="Tambah" 
                error={err} 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
            />
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
        
        const handleSubmit = (values, { setSubmitting, resetForm }) => {
            console.log(values);
            setSubmitting(false);
        };
        const [err, setErr] = useState(initErr);

        return (
            <LKAEForm 
                title="Tambah Kontra Bon Baru" 
                submitButton="Tambah" 
                error={err} 
                initialValues={initialValues} 
                onSubmit={handleSubmit} 
                options={allNota}
            />
        );
    };
    
    return (
        <CModal open={props.open} onClose={cl}>
            {props.path === "/home" ? AddNota() : AddKontra()}
        </CModal>
    );
}

export default AddForm;