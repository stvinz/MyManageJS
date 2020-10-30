import React, { useState } from 'react';
import { Modal, makeStyles } from '@material-ui/core';

const modalWidth = 700;

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: modalWidth,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const getModalStyle = () => {
    const vw = window.outerWidth;
    const top = 10;
    const left = (1 - modalWidth / vw) * 100 / 2;

    return {
        top: `${top}%`,
        left: `${left}%`,
    };
};

function CModal(props) {
    /*--------------------
        Class Components
    ---------------------*/
    const classes = useStyles();

    /*---------------------------
        Component and Modals
    ---------------------------*/
    const [modalStyle] = useState(getModalStyle);

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <div style={modalStyle} className={classes.paper}>
                {props.children}
            </div>
        </Modal>
    );
}

export default CModal;