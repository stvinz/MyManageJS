import React from 'react';
import { Button } from '@material-ui/core';

function CustButton(props) {
    return (
        <Button variant="contained" {...props}>{ props.children }</Button>
    );
}

export default CustButton;