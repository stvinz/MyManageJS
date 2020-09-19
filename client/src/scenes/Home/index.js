/*--------------------
      Home page
---------------------*/
import React from 'react';
import { Paper, TableContainer } from '@material-ui/core';

import { TableForm } from './components';

function Home(){
    return ( 
        <TableContainer component={Paper}>
            <TableForm />
        </TableContainer>
    );
}

export default Home;