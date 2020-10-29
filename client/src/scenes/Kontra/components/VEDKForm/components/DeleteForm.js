import React from 'react';
import { makeStyles, Box } from '@material-ui/core';

import { CustButton } from '../../../../../components/CustForm';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: 20
    },
    box: {
        margin: "10px 0"
    }
}));

function DeleteForm(props) {
    /*--------------------
        Class Components
    ---------------------*/
    const classes = useStyles();
    const handleNo = () => props.onClose();
    const handleYes = () => {
        const input = {
            id: props.data.id
        };

        console.log(input);
    };
    
    return (
        <Box className={classes.box}>
            <CustButton onClick={handleNo} className={classes.button} autoFocus>No</CustButton>
            <CustButton onClick={handleYes} className={classes.button}>Yes</CustButton>
        </Box>
    );
}

export default DeleteForm;