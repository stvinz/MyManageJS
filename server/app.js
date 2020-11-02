/*-----------------
    Main Program
------------------*/
const createError = require('http-errors');
const express = require("express");
const app = express();

// Temp development
const cors = require('cors');
const corsOps = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOps));

/*------------------
    Run Bootstraps
--------------------*/
require('./bootstrap/app');
require('./bootstrap/database');

/*-----------------
    Data Parser
------------------*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*----------------------
        Routes
----------------------*/
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

/*----------------------
   Catching 404 Error
----------------------*/
app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;