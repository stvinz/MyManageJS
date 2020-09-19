/*--------------------
        Header
---------------------*/
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Collapse, Box } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

import SearchForm from '../SearchForm';

function Header(){
    var history = useHistory();

    const pages = ['/home', '/kontra'];
    const [ searchState, setSearchState ] = useState(false);
    const [ cur_page, switchPage ] = useState(1);

    return ( 
        <div className="header">
            <AppBar position="static">
                <Toolbar>
                    <Typography component="h1" variant="h5">MyManage</Typography>
                    <IconButton onClick={() => {
                        history.push(pages[cur_page]);
                        return switchPage(cur_page === 1 ? 0 : 1);
                    }}>
                        <RefreshIcon />
                    </IconButton>
                    <IconButton>
                        <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => {setSearchState(!searchState);}}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box>
                <Collapse in={ searchState } timeout="auto">
                    <SearchForm />
                </Collapse>
            </Box>
        </div>
    );
}

export default Header;