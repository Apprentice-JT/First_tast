var express = require('express');
var router = express.Router();
var ctrlMain = require('../ontrollers/main');

/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;
