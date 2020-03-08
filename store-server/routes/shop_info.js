var express = require('express');
var router = express.Router();


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