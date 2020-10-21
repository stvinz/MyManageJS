/*--------------------
      Home page
---------------------*/
import React, { useState, useEffect } from 'react';
import { Paper, TableContainer } from '@material-ui/core';
import { contextMenu } from 'react-contexify';

import { AddForm, EDHForm } from './components';
import { TableView } from '../../components';

import { nota } from '../../services';

function Home(){
    /*-------------------
        Table Contents
    --------------------*/
    const titles = ["No. Bon", "Tanggal", "Nama", "Jumlah"];
    const names = ["id", "dateCreated", "name", "total"];
    const [content, upContent] = useState([{
        id: 1,
        dateCreated: new Date().toISOString(),
        name: "John",
        total: "AGKVS"
    }]);

    /*---------------------------
        Component and Modals
    ---------------------------*/
    const EDH_ID = "edh_id";
    const handleContext = (e, nota) => {
        e.preventDefault();

        contextMenu.show({
            id: EDH_ID,
            event: e,
            props: {
                nota: nota
            }
        });
    };

    useEffect(() => {
        nota.get()
            .then((value) => upContent(value))
            .catch((err) => console.log(err))
    }, []);

    return (
        <div>
            
            <TableContainer component={Paper}>
                <TableView titles={titles} names={names} content={content} onContextMenu={handleContext} />
            </TableContainer>
            <EDHForm />
        </div>
    );
}

export default Home;