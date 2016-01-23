var express = require('express');
var router = express.Router();
var ctrlMain = require('../controers/main');

/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;
