/*----------------------
    Database Bootstrap
------------------------*/
const mongoose = require('mongoose');
const debug = require('debug')('database');
const config = require('../config/database');

const uri = config.uri;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(uri, options);

const db = mongoose.connection;

// Upon failure
db.on('error', console.error.bind('Connection error:'));

// Upon success
db.once('open', () => debug("Connection is open"));

// Init schema
require('../database/models/Nota');
require('../database/models/Kontra');
