import React from 'react';

import { LDForm } from '../../../../../components';
import { nota } from '../../../../../services';

function DeleteForm(props) {
    const handleNo = () => props.onClose();
    const handleYes = () => {
        nota.del(props.data.id)
            .then((value) => props.onClose())
            .catch((err) => window.alert("Gagal menghapus!"));
    };

    return (
        <LDForm handleNo={handleNo} handleYes={handleYes} />
    );
}

export default DeleteForm;