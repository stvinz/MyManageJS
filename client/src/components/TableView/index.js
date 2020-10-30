/*--------------------
      TableView
---------------------*/
import React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, makeStyles } from '@material-ui/core';
import { yellow, red } from '@material-ui/core/colors';

const useStyles = makeStyles({
    blank: {
    },
    highlighted: {
        backgroundColor: yellow['200']
    },
    grouped: {
        backgroundColor: red['200']
    }
});

function TableView(props) {
    const classes = useStyles();
    const content = props.content ? props.content : [];
    const handleContext = props.onContextMenu ? props.onContextMenu : (() => {});
    const titles = props.titles ? props.titles : [];
    const names = props.names ? props.names : [];

    return ( 
        <Table>
            <TableHead>
                <TableRow>
                    {titles.map((title) => 
                        <TableCell key={title}>{title}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {content.map((el, index) => 
                    <TableRow key={index} onContextMenu={(e) => handleContext(e, el)} hover={true} 
                    className={el.highlighted ? classes.highlighted : (el.grouped ? classes.grouped : classes.blank )}>
                        {names.map((name) => 
                            <TableCell key={`${name}.${el[name]}`}>{el[name]}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default TableView;

