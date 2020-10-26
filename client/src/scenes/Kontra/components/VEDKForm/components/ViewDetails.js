import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, TableContainer } from '@material-ui/core';

import { TableView } from '../../../../../components';

const useStyles = makeStyles((theme) => ({
    tablecontainer: {
        margin: "10px 0"
    },
}));

function ViewDetails() {
    const classes = useStyles();

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

    // Calculate total at bottom right
    return (
        <TableContainer component={Paper} className={classes.tablecontainer}>
            <TableView titles={titles} names={names} content={content} />
        </TableContainer> 
    );
}

export default ViewDetails;