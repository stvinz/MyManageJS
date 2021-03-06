const debug = require('debug')('server');
const joi = require('joi');

const mongoose = require('mongoose');
const Nota = mongoose.model('Nota');

const post_schema = joi.object().keys({
    id: joi.number().required().label('No. Bon'),
    name: joi.string().min(3).max(30).required().label('Nama'),
    dateCreated: joi.date().max('now').iso().required().label('Tanggal'),
    total: joi.alternatives().try(
        joi.number(),
        joi.string().regex(new RegExp('/^[jnsxgltpk]([jnsxgltpko])*$/i'))
    ).required().label('Total')
});

const highlighted_schema = joi.object().keys({
    id: joi.number().required().label('No. Bon'),
    highlighted: joi.boolean().required()
});

const grouped_schema = joi.object().keys({
    id: joi.number().required().label('No. Bon'),
    grouped: joi.boolean().required()
});

const update_schema = joi.alternatives().try(
    post_schema,
    grouped_schema,
    highlighted_schema
).required();

const get_schema = joi.object().keys({
    limit: joi.number(),
    page: joi.number()
}).with('limit', 'page');

const updateOps = {
    useFindAndModify: false
};

exports.save = async (input) => 
    new Promise(async (resolve, reject) => {
        try {
            input = await post_schema.validateAsync(input);

            if (!(typeof input.total === 'number' && isFinite(input.total))) {
                // Convert from pattern to numbers
            }
            
            var data = await Nota.findOneAndReplace({id: input.id, deleted: true}, input, {upsert: true, ...updateOps});

            return resolve(data);
        }
        catch (err) {
            debug(err);
            return reject(err);
        }
    });

exports.get = async (input) => 
    new Promise(async (resolve, reject) => {
        const def = {
            limit: 20,
            page: 1,
        };
        
        try {
            input = await get_schema.validateAsync(input);
            const aggregate = Nota.aggregate();
            
            aggregate
                .match({deleted: false})
                .limit(input.limit ? input.limit : def.limit)
                .skip((input.page ? input.page - 1 : def.page - 1) * (input.limit ? input.limit : def.limit));

            var data = await aggregate.exec();
            
            return resolve(data);
        }
        catch (err) {
            debug(err);
            return reject(err);
        }
    });

exports.update = async (input) => 
    new Promise(async (resolve, reject) => {
        try {
            input = await update_schema.validateAsync(input);

            if (!(typeof input.total === 'number' && isFinite(input.total))) {
                // Convert from pattern to numbers
            }
            
            var data = await Nota.findOneAndUpdate({id: input.id}, input, updateOps);

            if (!data) {
                return reject("Not found");
            }
            else {
                return resolve(data);
            }
        }
        catch (err) {
            debug(err);
            return reject(err);
        }
    });

exports.del = async (input) => 
    new Promise(async (resolve, reject) => {
        try {
            input = await joi.number().required().label("No. Bon").validateAsync(input);
            
            var data = await Nota.findOneAndUpdate({id: input}, {deleted: true}, updateOps);

            if (!data) {
                return reject("Not found");
            }
            else {
                return resolve(data);
            }
        }
        catch (err) {
            debug(err);
            return reject(err);
        }
    });