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

const del = (input) => {

};

const edit = (input) => {

};

const search = (input) => {

};

const get = (input) => 
    new Promise(async (resolve, reject) => {
        try {
            const validated = await page_schema.validate(input);
            const res = await api.get(routes.nota(), validated);

            resolve(res);
        }
        catch (err) {
            reject(err);
        }
    });

export default { add, get };