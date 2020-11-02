import React from 'react';
import { useDispatch } from 'react-redux';

import { LDForm } from '../../../../../components';
import { nota } from '../../../../../services';
import { setContent } from '../../../../../slices/notaSlice';

function DeleteForm(props) {
    const dispatch = useDispatch();
    const handleNo = () => props.onClose();
    const handleYes = () => {
        nota.del(props.data.id)
            .then((res) => {
                dispatch(setContent(res));
                props.onClose()
            })
            .catch((err) => window.alert(err.message));
    };

    return (
        <LDForm handleNo={handleNo} handleYes={handleYes} />
    );
}

export default DeleteForm;