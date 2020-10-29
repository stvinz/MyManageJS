/*----------------
   Nota Services
-----------------*/
import * as Yup from 'yup';

import api from '../api';
import routes from '../routes';

import { methodsToObject } from '../../utils';

const nota_schema = Yup.object().shape({
    id: Yup.number().required().label('No. Bon'),
    dateCreated: Yup.date().max(new Date()).required().label('Tanggal'),
    name: Yup.string().min(3).max(30).required().label('Nama'),
    total: Yup.mixed().oneOf([
        Yup.number(), 
        Yup.string().matches(new RegExp(process.env.REACT_APP_API_NOTA_PAT))
    ]).required().label('Total')
});

const retrieve_schema = Yup.object().shape({
    limit: Yup.number().min(1).default(20),
    page: Yup.number().min(1).default(1)
});

const highlight_schema = Yup.object().shape({
    id: Yup.number().required(),
    highlighted: Yup.boolean()
});

const notaServices = (method) => 
    (input) =>
        new Promise(async (resolve, reject) => {
            try {
                var data;
                switch (method) {
                    case "get":
                        input = await retrieve_schema.validate(input);
                        data = await api.get(routes.nota(), input);
                        break;
                    case "add":
                        input = await nota_schema.validate(input);
                        data = await api.post(routes.nota(), input);
                        break;
                    case "edit":
                        input = await nota_schema.validate(input);
                        data = await api.put(routes.nota(), input);
                        break;
                    case "del":
                        input = await Yup.number().required().label('No. Bon').validate(input);
                        data = await api.delete(routes.nota(), input);
                        break;
                    case "highlight":
                        input = await highlight_schema.validate(input);
                        data = await api.post(routes.nota(), input);
                        break;
                    case "search":
                        break;
                    default:
                        return reject("Invalid method!");
                }

                return resolve(data);
            }
            catch (err) {
                return reject(err);
            }
        });

const methods = ['get', 'add', 'edit', 'del', 'highlight'];
const nota = methodsToObject(methods, notaServices);

export default nota;