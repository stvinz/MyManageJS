import React from 'react';

import { LDForm } from '../../../../../components';

function DeleteForm(props) {
    const handleNo = () => props.onClose();
    const handleYes = () => {
        const input = {
            id: props.data.id
        };

        console.log(input);
    };
    
    return (
        <LDForm handleNo={handleNo} handleYes={handleYes} />
    );
}

export default DeleteForm;