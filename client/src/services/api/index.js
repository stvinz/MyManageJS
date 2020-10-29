import axios from 'axios';
import _ from 'lodash';

import { methodsToObject } from '../../utils';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const callApi = (method) =>
    (route, input) =>
        new Promise(async (resolve, reject) => {
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
        
            if (res.status >= 200 && res.status < 300) {
                return resolve(res.data.data)
            }
            else {
                return reject(res.data.msg);
            }
        });

const methods = ['get', 'post', 'put', 'del'];
const api = methodsToObject(methods, callApi);

export default api;