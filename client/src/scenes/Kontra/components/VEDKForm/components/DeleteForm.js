import React from 'react';
import { Button, makeStyles, Box } from '@material-ui/core';

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
            <Button variant="contained" onClick={handleNo} className={classes.button} autoFocus>No</Button>
            <Button variant="contained" onClick={handleYes} className={classes.button}>Yes</Button>
        </Box>
    );
}

export default DeleteForm;