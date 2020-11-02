import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { LNAEForm } from '../../../../../components';
import { nota } from '../../../../../services';
import { setContent } from '../../../../../slices/notaSlice';

function EditForm(props) {
    const cl = () => props.onClose();
    const dispatch = useDispatch();

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
    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        nota.edit(values)
            .then((res) => {
                setErr(initErr);
                dispatch(setContent(res));
                
                window.alert("Berhasil edit bon!");
                resetForm();
                setSubmitting(false);

                return cl();
            })
            .catch((err) => {
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

                window.alert(err.message);
                return setSubmitting(false);
            });
    };
    const [err, setErr] = useState(initErr);

    return (
        <LNAEForm 
            submitButton="Tambah" 
            error={err} 
            initialValues={initialValues} 
            onSubmit={handleSubmit}
        />
    );
}

export default EditForm;