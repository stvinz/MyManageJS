// Extend routes from base routes
const routes_ex = (route) => 
    (dir = '') => route + dir;

// List of base routes
const routes = {
    nota: routes_ex('/nota'),
    kontra: routes_ex('/kontra')
};

export default routes;