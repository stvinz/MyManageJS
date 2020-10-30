/*-------------------------
    Edit Form Components
--------------------------*/
import React, { useState } from 'react';

import { LKAEForm } from '../../../../../components';

function EditForm(props) {
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

    return (
        <LKAEForm 
            submitButton="Tambah" 
            error={err} 
            initialValues={initialValues} 
            onSubmit={handleSubmit} 
            options={allNota}
        />
    );
}

export default EditForm;