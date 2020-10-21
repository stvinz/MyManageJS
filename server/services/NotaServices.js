const debug = require('debug')('server');
const joi = require('joi');

const mongoose = require('mongoose');
const Nota = mongoose.model('Nota');

const nota_schema = joi.object().keys({
    id: joi.number().required(),
    name: joi.string().min(3).max(30).required(),
    dateCreated: joi.date().max('now').iso().required(),
    total: joi.number().required(),
    highlighted: joi.boolean().default(false),
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
    var data = [];
    const def = {
        limit: 20,
        page: 1,
    };
    const aggregate = Nota.aggregate();

    aggregate.limit(criteria.limit ? criteria.limit : def.limit)
        .skip((criteria.page ? criteria.page - 1 : def.page - 1) * (criteria.limit ? criteria.limit : def.limit))
    
    try{
        data = await aggregate.exec();
        
        if (!data) {
            data = [];
        }
    }
    catch (err) {
        debug(err);
    }

    return data;
};

exports.update = (data) => {
    return true;
};