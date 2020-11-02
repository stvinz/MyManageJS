import axios from 'axios';
import _ from 'lodash';

import { methodsToObject } from '../../utils';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.defaults.headers.put['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

const callApi = (method) =>
    (route, input) =>
        new Promise(async (resolve, reject) => {
            try {
                var res;
        
                switch (method) {
                    case "get":
                        // query
                        input = input !== null ? _.mapValues(input, (val) => encodeURIComponent(val)) : null;
                        res = await axiosInstance.get(route, {params: input});
                        break;
                    case "post":
                        // application/x-www-form-urlencoded
                        res = await axiosInstance.post(route, JSON.stringify(input));
                        break;
                    case "put":
                        // application/x-www-form-urlencoded
                        res = await axiosInstance.put(route, JSON.stringify(input));
                        break;
                    case "delete":
                        // params
                        res = await axiosInstance.delete(`${route}/${input}`);
                        break;
                    default:
                        return reject("Invalid method!");
                }
                
                console.log(res.data.message);
                return resolve(res.data.data);
            }
            catch (err) {
                return reject(err.response ? err.response.data.err : {message: "Internal server error - please check connection!", path: null});
            }
        });

const methods = ['get', 'post', 'put', 'delete'];
const api = methodsToObject(methods, callApi);

export default api;