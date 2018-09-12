var express = require('express');
var router = express.Router();
var screepsapi = require('../screepsapi/screepsapi');

/* GET users listing. */
router.get('/', function(req, res, next) {
  screepsapi.apiRequest('getMemory');
  res.send('respond with a resource');
});

module.exports = router;
