/*----------------
   Nota Services
-----------------*/
import * as Yup from 'yup';

import api from '../api';
import routes from '../routes';

const nota_schema = Yup.object().shape({
    id: Yup.number().required(),
    dateCreated: Yup.date().max(new Date()).required(),
    name: Yup.string().min(3).max(30).required(),
    total: Yup.number().required(),
});

const page_schema = Yup.object().shape({
    page_items: Yup.number().min(1).default(20),
    page_no: Yup.number().min(1).default(1)
});

const nota_id = Yup.object().shape({
    id: Yup.number().required()
});

const add = (input) => 
    new Promise(async (resolve, reject) => {
        try {
            const validated = await nota_schema.validate(input);
            const res = await api.post(routes.nota(), validated);

            resolve(res);
        }
        catch (err) {
            reject(err);
        }
    });

const del = (input) => 
    new Promise(async (resolve, reject) => {
        try {
            const validated = await nota_id.validate(input);
            const res = await api.delete(routes.nota(), validated);

            resolve(res);
        }
        catch (err) {
            reject(err);
        }
    });

const edit = (input) => 
    new Promise(async (resolve, reject) => {
        try {
            const validated = await nota_schema.validate(input);
            const res = await api.put(routes.nota(), validated);

            resolve(res);
        }
        catch (err) {
            reject(err);
        }
    });

const highlight = (input) => 
    new Promise(async (resolve, reject) => {
        try {
            const validated = await nota_id.validate(input);
            const res = await api.post(routes.nota('/highlight'), validated);

            resolve(res);
        }
        catch (err) {
            reject(err);
        }
    });

const search = (input) => {

};

const get = (input) => 
    new Promise(async (resolve, reject) => {
        try {
            const validated = await page_schema.validate(input);
            const res = await api.get(routes.nota(), validated);

            resolve(res.data);
        }
        catch (err) {
            reject(err);
        }
    });

export default { add, get, highlight, del, edit };