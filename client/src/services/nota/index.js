/*----------------
   Nota Services
-----------------*/
import * as Yup from 'yup';
import _ from 'lodash';

import api from '../api';
import routes from '../routes';

import { methodsToObject } from '../../utils';

const post_schema = Yup.object().shape({
    id: Yup.number().required().label('No. Bon'),
    dateCreated: Yup.date().max(new Date()).required().label('Tanggal'),
    name: Yup.string().min(3).max(30).required().label('Nama'),
    total: Yup.mixed().test(
        'total_test',
        // eslint-disable-next-line no-template-curly-in-string
        '\'${path}\' tests failed',
        (value) => (Yup.number().isValid(value) || Yup.string().matches(new RegExp(process.env.REACT_APP_API_NOTA_PAT)).isValid(value))
    ).required().label('Total')
});

const highlighted_schema = Yup.object().shape({
    id: Yup.number().required().label('No. Bon'),
    highlighted: Yup.boolean().required()
});

const grouped_schema = Yup.object().shape({
    id: Yup.number().required().label('No. Bon'),
    grouped: Yup.boolean().required()
});

const get_schema = Yup.object().shape({
    limit: Yup.number().min(1).default(20),
    page: Yup.number().min(1).default(1)
});

// Set content directly to notaSlice, get after every method, return data from get
// Need to separate get and post so get can separately configured
const notaServices = (method) => 
    (input, getOps = {page: 1, limit: 20}) =>
        new Promise(async (resolve, reject) => {
            try {
                var data;
                switch (method) {
                    case "get":
                        getOps = input && _.isEmpty(input) ? input : getOps;
                        break;
                    case "add":
                        input = await post_schema.validate(input);
                        await api.post(routes.nota(), input);
                        break;
                    case "edit":
                        input = await post_schema.validate(input);
                        await api.put(routes.nota(), input);
                        break;
                    case "del":
                        input = await Yup.number().required().label('No. Bon').validate(input);
                        await api.delete(routes.nota(), input);
                        break;
                    case "highlight":
                        input = {
                            id: input.id,
                            highlighted: !input.highlighted
                        };

                        input = await highlighted_schema.validate(input);
                        await api.put(routes.nota(), input);
                        break;
                    case "search":
                        break;
                    default:
                        return reject("Invalid method!");
                }

                getOps = await get_schema.validate(getOps);
                data = await api.get(routes.nota(), getOps);

                return resolve(data);
            }
            catch (err) {
                return reject(err);
            }
        });

const methods = ['get', 'add', 'edit', 'del', 'highlight'];
const nota = methodsToObject(methods, notaServices);

export default nota;