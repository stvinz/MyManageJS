/*----------------------
      Query Parser
----------------------*/
const queryParser = (req, res, next) => {
    var data = {};
    
    if (req.query) {
        Object.keys(req.query).forEach(field => {
            data[field] = decodeURIComponent(req.query[field]);
        });
    
        req.body = data;
    }

    return next();
};

module.exports = queryParser;