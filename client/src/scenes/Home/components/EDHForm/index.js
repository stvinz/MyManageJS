/*----------------------------
    Forms and Modal in Home
-----------------------------*/
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { Menu, Item } from 'react-contexify';

import { EditForm, DeleteForm } from './components';
import { CModal } from '../../../../components';
import { nota } from '../../../../services';

import 'react-contexify/dist/ReactContexify.min.css';

function TableForm(){
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
        
    };

    /*---------------------------
        Component and Modals
    ---------------------------*/
    const EDH_ID = "edh_id";
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
        <CModal open={opDel} onClose={cl}>
            <Typography variant="h6" component="h6">Hapus bon <WarningText>{data.id}</WarningText> dengan nama <WarningText>{data.name}</WarningText> ?</Typography>
            <DeleteForm data={data} onClose={cl} />
        </CModal>
    );

    const EditModal = () => (
        <CModal open={opEdit} onClose={cl}>
            <Typography variant="h6" component="h6">Edit bon <WarningText>{data.id}</WarningText> dengan nama <WarningText>{data.name}</WarningText></Typography>
            <EditForm data={data} onClose={cl} />
        </CModal>
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