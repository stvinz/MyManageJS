/*--------------------
      TableView
---------------------*/
import React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';

function TableView(props) {
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
                    <TableRow key={index} onContextMenu={(e) => handleContext(e, el)} hover={true}>
                        {names.map((name) => 
                            <TableCell key={el[name]}>{el[name]}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default TableView;

