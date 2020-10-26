/*--------------------
      Kontra page
---------------------*/
import React, { useState, useEffect } from 'react';
import { Paper, TableContainer } from '@material-ui/core';
import { contextMenu } from 'react-contexify';

import { VEDKForm } from './components';
import { TableView } from '../../components';

function Kontra(){
    /*-------------------
        Table Contents
    --------------------*/
    const titles = ["Tanggal", "Nama", "Jumlah"];
    const names = ["dateCreated", "name", "total"];
    const [content, upContent] = useState([{
        id: 1,
        dateCreated: new Date().toISOString(),
        name: "John",
        total: "AGKVS"
    }]);

    /*---------------------------
        Component and Modals
    ---------------------------*/
    const VEDK_ID = "vedk_id";
    const handleContext = (e, nota) => {
        e.preventDefault();

        contextMenu.show({
            id: VEDK_ID,
            event: e,
            props: {
                nota: nota
            }
        });
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <TableView titles={titles} names={names} content={content} onContextMenu={handleContext} />
            </TableContainer>
            <VEDKForm />
        </div>
    );
}

export default Kontra;