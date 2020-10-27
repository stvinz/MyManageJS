/*----------------------
      API Routes
----------------------*/
const express = require('express');
const NotaController = require('../controller/NotaController');
const router = express.Router();

// Search + view all + get last nota
router.get('/nota', NotaController.get);
// Save new nota
router.post('/nota', NotaController.post);
// Update old nota + highlight
router.put('/nota', NotaController.put);
// Delete nota
router.delete('/nota/:id', NotaController.delete);
/*
// Search + view all
router.get('/kontra', KontraController.get);
// Save new nota
router.post('/kontra', KontraController.post);
// Update old nota + highlight
router.put('/kontra', KontraController.put);
// Delete nota
router.delete('/kontra/:id', KontraController.delete);
// Details
router.get('/kontra/details/:id', KontraController.details);
*/
module.exports = router;