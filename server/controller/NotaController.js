const NotaServices = require('../services/NotaServices');

const NotaController = async (req, res) => {
    var input = req.body;
    var data, msg, error, status = 200;

    try {
        switch (req.method) {
            case "GET":
                data = await NotaServices.get(input);
                msg = "Success get!";
                break;
            case "POST":
                data = await NotaServices.save(input);
                msg = "Success save!";
                status = 201;
                break;
            case "PUT":
                data = await NotaServices.update(input);
                msg = "Success update!";
                break;
            case "DELETE":
                input = req.params["id"];
                data = await NotaServices.del(input);
                msg = "Success delete!";
                break;
        }
    }
    catch (err) {
        data = null;
        error = {
            message: err.details ? err.details[0].message : err.message,
            path: err.details ? err.details[0].path[0] : null
        };
        status = 400;
    }

    return res.status(status).json({data: data, message: msg, err: error});
};

module.exports = NotaController;