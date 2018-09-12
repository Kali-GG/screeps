var express = require('express');
var router = express.Router();
var screepsapi = require('../screepsapi/screepsapi');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('wtf wieso consoled er das nicht?!');
  //screepsapi.apiRequest('getMemory');
  res.render('index', { title: 'Express' });
});

module.exports = router;
