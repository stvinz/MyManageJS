import React from 'react';
import { Button } from '@material-ui/core';
import { nota } from '../../../../../services';

function DeleteForm(props) {
    const handleNo = () => props.onClose();
    const handleYes = () => {
        const input = {
            id: props.data.id
        };

        nota.del(input)
            .then((value) => props.onClose())
            .catch((err) => window.alert("Gagal menghapus!"));
    };

    return (
        <div>
            <Button variant="contained" onClick={handleNo} autoFocus>No</Button>
            <Button variant="contained" onClick={handleYes}>Yes</Button>
        </div>
    );
}

export default DeleteForm;