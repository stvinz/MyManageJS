import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { nota } from '../../../../../services';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: 20
    },
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

        nota.del(input)
            .then((value) => props.onClose())
            .catch((err) => window.alert("Gagal menghapus!"));
    };
    const style = {
        margin: "10px 0px"
    }

    return (
        <div style={style}>
            <Button variant="contained" onClick={handleNo} className={classes.button} autoFocus>No</Button>
            <Button variant="contained" onClick={handleYes} className={classes.button}>Yes</Button>
        </div>
    );
}

export default DeleteForm;