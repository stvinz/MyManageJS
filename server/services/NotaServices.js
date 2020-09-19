const debug = require('debug')('server');
const joi = require('joi');

const mongoose = require('mongoose');
const Nota = mongoose.model('Nota');

const nota_schema = joi.object().keys({
    id: joi.number().required(),
    name: joi.string().min(3).max(30).required(),
    dateCreated: joi.date().max('now').iso().required(),
    total: joi.number().required(),
    highlighted: joi.boolean(),
});

exports.save = async (data) => {
    var success = false;

    try {
        data = await nota_schema.validateAsync(data);
        
        var nota = new Nota(data);
        var saveNota = await nota.save();

        success = true;
    }
    catch (err) {
        debug(err);
    }

    return success;
};

exports.get = async (criteria) => {

};

exports.update = (data) => {
    return true;
};