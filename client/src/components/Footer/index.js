/*--------------------
        Footer
---------------------*/
import React from 'react';
import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';


const useStyles = makeStyles({
    root: {
        backgroundColor: grey[50]
    },
    box: {
        padding: "1% 1%",
    },
    typography: {
        opacity: 0.7
    },
});

function Footer(){
    const classes = useStyles();

    return ( 
        <div className={ classes.root }>
            <Divider></Divider>
            <Box className={ classes.box } display="flex" justifyContent="center" alignItems="center">
                <Typography className={ classes.typography }>Made for Ocean Colour</Typography>
            </Box>
        </div>
    );
}

export default Footer;