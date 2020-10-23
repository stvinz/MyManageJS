/*--------------------
        Header
---------------------*/
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Collapse, Box, makeStyles } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

import { AddForm, SearchForm } from './components';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: '0 10px'
    },
}));

function Header(){
    var history = useHistory();
    const classes = useStyles();

    const pages = ['/home', '/kontra'];
    const [ searchState, setSearchState ] = useState(false);
    const [ addState, setAddState ] = useState(false);
    const [ cur_page, switchPage ] = useState(1);

    return ( 
        <div className="header">
            <AppBar position="static">
                <Toolbar>
                    <Typography component="h1" variant="h5" className={classes.typography}>MyManage</Typography>
                    <IconButton>
                        <AddIcon onClick={() => setAddState(!addState)} />
                    </IconButton>
                    <IconButton onClick={() => setSearchState(!searchState)}>
                        <SearchIcon />
                    </IconButton>
                    <div style={{marginLeft: 'auto'}}>
                        <IconButton onClick={() => {
                            history.push(pages[cur_page]);
                            return switchPage(cur_page === 1 ? 0 : 1);
                        }}>
                            <RefreshIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Box>
                <Collapse in={ searchState } timeout="auto">
                    <SearchForm />
                </Collapse>
            </Box>
            <AddForm open={ addState } onClose={() => setAddState(!addState)}/>
        </div>
    );
}

export default Header;