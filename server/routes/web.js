/*----------------------
      Web Routes
----------------------*/
const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(path.resolve('./resources'), 'build')));

router.get('/*', (req, res) => res.sendFile(path.join(path.resolve('./resources'), 'build', 'index.html')));

module.exports = router;