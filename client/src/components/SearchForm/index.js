/*--------------------
      Search Form
---------------------*/
import React from 'react';
import { TextField, Button, Grid, makeStyles } from '@material-ui/core';

const textFieldStyle = { InputLabelProps: {shrink: true}, variant: "outlined" };

const useStyles = makeStyles({
    root: {
        padding: "1% 1%",
    },
});

function SearchForm(){
    const classes = useStyles();

    return ( 
        <form>
            <Grid container className={ classes.root }>
                <Grid item>
                <TextField id="id" label="No Bon" {...textFieldStyle} />
                </Grid>
                <Grid item>
                <TextField id="name" label="Nama" {...textFieldStyle} />
                </Grid>
                <Grid item>
                <TextField id="dateStart" label="Awal Tanggal" type="date" {...textFieldStyle} />
                </Grid>
                <Grid item>
                <TextField id="dateEnd" label="Akhir Tanggal" type="date" {...textFieldStyle} />
                </Grid>
                <Grid item>
                <Button id="find" type="submit" variant="contained">Cari</Button>
                </Grid>
                <Grid item>
                <Button id="highlight" type="submit" variant="contained">Tandai</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default SearchForm;

