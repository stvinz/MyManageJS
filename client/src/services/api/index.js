import axios from 'axios';
import _ from 'lodash';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
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

const put = (route, input = null) => 
    new Promise(async (resolve, reject) => {
        try {
            const putOps = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const res = await api.put(route, JSON.stringify(input), putOps);
            
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

const del = (route, input = null) => 
    new Promise(async (resolve, reject) => {
        try {
            const res = await api.delete(route, JSON.stringify(input));
            
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

const endPoints = { post, get, put, del }; 

export default endPoints;