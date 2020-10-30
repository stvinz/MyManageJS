import React, { useState } from 'react';

import { LNAEForm } from '../../../../../components';
import { nota } from '../../../../../services';

function EditForm(props) {
    const cl = () => props.onClose();
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
        <LNAEForm 
            submitButton="Tambah" 
            error={err} 
            initialValues={initialValues} 
            onSubmit={handleSubmit}
        />
    );
}

export default EditForm;