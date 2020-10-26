/*--------------------
        Header
---------------------*/
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Collapse, Box, makeStyles, Grid } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

import { AddForm, SearchForm } from './components';

const useStyles = makeStyles((theme) => ({
    typography: {
        flexGrow: 1
    },
}));

function Header(){
    var history = useHistory();
    const classes = useStyles();

    const pages = ['/home', '/kontra'];
    const [ searchState, setSearchState ] = useState(false);
    const [ addState, setAddState ] = useState(false);
    const [ curPage, switchPage ] = useState(0);

    return ( 
        <div className="header">
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item sm={2}>
                            <IconButton onClick={() => setAddState(!addState)}>
                                <AddIcon />
                            </IconButton>
                            <IconButton onClick={() => setSearchState(!searchState)}>
                                <SearchIcon />
                            </IconButton>
                        </Grid>
                        <Grid item sm={8}>
                            <Typography component="h1" variant="h5" className={classes.typography} align="center">MyManage - {curPage === 0 ? "Bon" : "Kontra Bon"}</Typography>
                        </Grid>
                        <Grid container item sm={2} direction="row-reverse">
                            <IconButton onClick={() => {
                                const otherPage = curPage === 0 ? 1 : 0;
                                switchPage(otherPage);
                                return history.push(pages[otherPage]);
                            }}>
                                <RefreshIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box>
                <Collapse in={ searchState } timeout="auto">
                    <SearchForm />
                </Collapse>
            </Box>
            <AddForm open={ addState } onClose={() => setAddState(!addState)} path={ pages[curPage] }/>
        </div>
    );
}

export default Header;