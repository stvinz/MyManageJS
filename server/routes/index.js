/*----------------------
        Index
----------------------*/
const express = require('express');
const router = express.Router();

/*---------------------
      Middleware
----------------------*/
const queryParser = require('../middleware/queryParser');

/*----------------------
        Router
----------------------*/
router.use('/api', queryParser, require('./api'));
router.use('/', require('./web'));

module.exports = router;