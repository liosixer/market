var express = require('express');
var router = express.Router();

// 初始化数据库控制器
// var db_controller = require("../controllers/db_controller.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
