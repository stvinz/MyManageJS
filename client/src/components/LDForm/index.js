/*-------------------------
    Layout - Delete Form
--------------------------*/
import React from 'react';
import { makeStyles, Box } from '@material-ui/core';

import { CButton } from '../../components';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: 20
    },
    box: {
        margin: "10px 0"
    }
}));

function LDForm(props) {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <CButton onClick={props.handleNo} className={classes.button} autoFocus>No</CButton>
            <CButton onClick={props.handleYes} className={classes.button}>Yes</CButton>
        </Box>
    );
}

export default LDForm;