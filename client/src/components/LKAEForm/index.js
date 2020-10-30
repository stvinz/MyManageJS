/*-----------------------------------
    Layout - Kontra Add Edit Form
-----------------------------------*/
import React from 'react';
import { Typography, IconButton, Divider, Box, TextField, makeStyles } from '@material-ui/core';
import { Formik, Form, FieldArray, Field } from 'formik';
import { Autocomplete } from 'formik-material-ui-lab';

import { CButton, nameErrorBinder, CField } from '../../components';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    textfield: {
        margin: "10px 0"
    }
}));

function LKAEForm(props) {
    const classes = useStyles();
    const binder = nameErrorBinder(props.error);

    return (
        <div>
            <Typography variant="h6" component="h6">{props.title}</Typography>
            <Formik initialValues={props.initialValues} onSubmit={props.handleSubmit}>
                {({values}) => (
                    <Form>
                        <CField label="Nama" {...binder('name')} />
                        <CField label="Tanggal" type="date" {...binder('dateCreated')} />
                        <FieldArray name="notaList">
                            {(arrayHelpers) => (
                                <div>
                                    { values.notaList && values.notaList.length > 0 && values.notaList.map((elNota, index) => (
                                        <Box display="flex" key={index}>
                                            <Field name={`notaList.${index}`} component={Autocomplete} options={props.options} 
                                                getOptionSelected={(option, value) => (option.id === value.id) || (value === '')}
                                                getOptionLabel={(option) => (option ? (`${option.id} - ${option.name} ${option.total}`) : "")}
                                                renderInput={(params) => <TextField className={classes.textfield} {...params} variant="outlined" label={`Bon ${index + 1}`} required/>}
                                                autoHighlight
                                                fullWidth
                                            />
                                            { values.notaList.length === 1 
                                            ? null
                                            : (
                                                <IconButton onClick={() => arrayHelpers.remove(index)}>
                                                    <RemoveIcon />
                                                </IconButton>
                                            )}
                                            
                                            { index + 1 === values.notaList.length 
                                            ? (
                                                <IconButton onClick={() => arrayHelpers.push('')}>
                                                    <AddIcon />
                                                </IconButton>
                                            )
                                            : null}
                                        </Box>
                                    ))}
                                </div>
                            )}
                        </FieldArray>
                        <Divider />
                        <CButton type="submit">{props.submitButton}</CButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default LKAEForm;