import { methodsToObject } from '../../utils';

// Extend routes from base routes
const routes_ext = (route) => 
    (dir = '') => route + dir;

// List of base routes
const methods = ['nota', 'kontra'];
const routes = methodsToObject(methods, routes_ext);

export default routes;