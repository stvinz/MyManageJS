/*-----------------
    Main Program
------------------*/
const createError = require('http-errors');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

/*------------------
    Run Bootstraps
--------------------*/
require('./bootstrap/app');
require('./bootstrap/database');

/*-----------------
    Data Parser
------------------*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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