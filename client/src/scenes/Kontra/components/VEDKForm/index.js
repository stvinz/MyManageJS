import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { Menu, Item } from 'react-contexify';

import { DeleteForm, EditForm, ViewDetails } from './components';
import { CModal } from '../../../../components';

import 'react-contexify/dist/ReactContexify.min.css';

function VEDKForm() {
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
    };

    const handleDetails = ({props}) => {
        setData(props.nota);
        setOpDet(true);
    }

    /*---------------------------
        Component and Modals
    ---------------------------*/
    const VEDK_ID = "vedk_id";
    const [opDel, setOpDel] = useState(false);
    const [opDet, setOpDet] = useState(false);
    const [data, setData] = useState({});
    const [opEdit, setOpEdit] = useState(false);
    const cl = () => setOpDel(false) || setOpEdit(false) || setOpDet(false) || setData({});

    const TableCMenu = () => (
        <Menu id={VEDK_ID}>
            <Item onClick={handleHighlight}>Tandai/Hapus Tanda</Item>
            <Item onClick={handleDetails}>Lihat Detail</Item>
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

    const DetailsModal = () => (
        <CModal open={opDet} onClose={cl}>
            <Typography variant="h6" component="h6">Detail bon <WarningText>{data.id}</WarningText> dengan nama <WarningText>{data.name}</WarningText></Typography>
            <ViewDetails data={data} onClose={cl} />
        </CModal>
    );

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
            <DetailsModal />
            <DeleteModal />
            <EditModal />
        </div>
    );
}

export default VEDKForm;