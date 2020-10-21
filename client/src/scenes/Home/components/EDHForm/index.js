/*----------------------------
    Forms and Modal in Home
-----------------------------*/
import React, { useState } from 'react';
import { Modal, Typography } from '@material-ui/core';
import { Menu, Item } from 'react-contexify';
import { makeStyles } from '@material-ui/core';

import { DeleteForm } from './components';
import { nota } from '../../../../services';

import 'react-contexify/dist/ReactContexify.min.css';

const modalWidth = 500;

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
    const top = 15;
    const left = ((1 - modalWidth / vw) * 100 / 2) + 4;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};

function TableForm(){
    /*--------------------
        Class Components
    ---------------------*/
    const classes = useStyles();
    
    /*----------------------------
        ContextMenu Handlers
    ----------------------------*/
    const handleEdit = ({ props }) => {
        setData(props.nota);
        setOpEdit(true);
    };

    const handleDelete = ({ props }) => {
        setData(props.nota);
        setOpDel(true);
    };

    const handleHighlight = ({ props }) => {
        const input = {
            id: props.nota.id
        };
        nota.highlight(input)
            .then((value) => console.log(value))
            .catch((err) => console.log(err));
    };

    /*---------------------------
        Component and Modals
    ---------------------------*/
    const EDH_ID = "edh_id";
    const [modalStyle] = useState(getModalStyle);
    const [opDel, setOpDel] = useState(false);
    const [data, setData] = useState({});
    const [opEdit, setOpEdit] = useState(false);
    const cl = () => setOpDel(false) || setOpEdit(false) || setData({});

    const TableCMenu = () => (
        <Menu id={EDH_ID}>
            <Item onClick={handleHighlight}>Tandai/Hapus Tanda</Item>
            <Item onClick={handleEdit}>Edit</Item>
            <Item onClick={handleDelete}>Hapus</Item>
        </Menu>
    );

    const WarningText = (props) => {
        const style = {
            color: "red"
        };

        return (
            <b style={style}>{props.children}</b>
        );
    };

    const DeleteModal = () => (
        <Modal open={opDel} onClose={cl}>
            <div style={modalStyle} className={classes.paper}>
                <Typography variant="h6" component="h6">Hapus bon <WarningText>{data.id}</WarningText> dengan nama <WarningText>{data.name}</WarningText> ?</Typography>
                <DeleteForm data={data} onClose={cl} />
            </div>
        </Modal>
    );

    const EditModal = () => (
        <Modal open={opEdit} onClose={cl}>
            <div style={modalStyle} className={classes.paper}>
                <p>Hello</p>
            </div>
        </Modal>
    );

    return ( 
        <div>
            <TableCMenu />
            <DeleteModal />
            <EditModal />
        </div>
    );
}

export default TableForm;