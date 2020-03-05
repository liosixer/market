var express = require('express');
var router = express.Router();

// 初始化数据库控制器
// var db_controller = require("../controllers/db_controller.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    var shop_info = require("../models/shop_info");

    shop_info.find({},function(err, doc){
        if(err) {
            console.log(err.message)
        }else{
            res.send(doc);
        }
    });
});

module.exports = router;