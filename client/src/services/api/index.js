import axios from 'axios';
import _ from 'lodash';

const api = axios.create({
    baseUrl: process.env.API_URL
});

const post = (route, input = null) =>
    new Promise(async (resolve, reject) => {
        try {
            const postOps = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
    
            const res = await api.post(route, JSON.stringify(input), postOps);
            
            if (res.err) {
                reject(res.err);
            }
            else {
                resolve(res);
            }
        }
        catch (err) {
            reject(err);
        }
    });

const get = (route, input = null) => 
    new Promise(async (resolve, reject) => {
        try {
            if (input !== null) {
                input = _.mapValues(input, (val) => encodeURIComponent(val));
            }

            const res = await api.get(route, {params: input});

            if (res.err) {
                reject(res.err);
            }
            else {
                resolve(res);
            }
        }
        catch (err) {
            reject(err);
        }
    });

export default { post, get };