import React from 'react';
import { makeStyles, Box } from '@material-ui/core';

import { CustButton } from '../../../../../components/CustForm';
import { nota } from '../../../../../services';

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
        nota.del(props.data.id)
            .then((value) => props.onClose())
            .catch((err) => window.alert("Gagal menghapus!"));
    };

    return (
        <Box className={classes.box}>
            <CustButton onClick={handleNo} className={classes.button} autoFocus>No</CustButton>
            <CustButton onClick={handleYes} className={classes.button}>Yes</CustButton>
        </Box>
    );
}

export default DeleteForm;