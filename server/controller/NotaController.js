const NotaServices = require('../services/NotaServices');

exports.get = async (req, res) => {
    return res.json({msg: "get nota"});
}

exports.post = async (req, res) => {
    const data = req.body;
    const success = await NotaServices.save(data);

    return success ? 
        res.json({msg: "post nota"}): 
        res.json({msg: "fail save"});
}

exports.put = async (req, res) => {
    const data = req.body;
    const success = await NotaServices.update(data);

    return success ? 
        res.json({msg: "update nota"}): 
        res.json({msg: "fail update"});
};
