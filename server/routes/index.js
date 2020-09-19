/*----------------------
        Index
----------------------*/
const express = require('express');
const router = express.Router();

/*----------------------
        Router
----------------------*/
router.use('/api', require('./api'));
router.use('/', require('./web'));

module.exports = router;