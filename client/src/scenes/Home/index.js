/*--------------------
      Home page
---------------------*/
import React, { useEffect } from 'react';
import { Paper, TableContainer } from '@material-ui/core';
import { contextMenu } from 'react-contexify';
import { useDispatch, useSelector } from 'react-redux';

import { EDHForm } from './components';
import { TableView } from '../../components';
import { selectNota, setContent } from '../../slices/notaSlice';

import { nota } from '../../services';

function Home(){
    /*-------------------
        Table Contents
    --------------------*/
    const titles = ["No. Bon", "Tanggal", "Nama", "Jumlah"];
    const names = ["id", "dateCreated", "name", "total"];
    const content = useSelector(selectNota).docs;
    const getOps = useSelector(selectNota).getOps;
    const dispatch = useDispatch();

    useEffect(() => {
         nota.get(getOps)
            .then((res) => dispatch(setContent(res)))
            .catch((err) => window.alert(err.message));
    }, [dispatch, getOps]);
    
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