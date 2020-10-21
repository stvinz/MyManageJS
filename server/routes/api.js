/*----------------------
      API Routes
----------------------*/
const express = require('express');
const NotaController = require('../controller/NotaController');
const router = express.Router();

router.get('/nota', NotaController.get);
router.post('/nota', NotaController.post);

module.exports = router;