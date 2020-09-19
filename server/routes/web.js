/*----------------------
      Web Routes
----------------------*/
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.json({msg: "hello"});
});

/*----------------------
      View Router
----------------------*/
/*router.use(express.static(path.join(__dirname, 'build')));

router.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
});*/

module.exports = router;