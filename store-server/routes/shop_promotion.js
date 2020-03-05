var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var shop_promotion = require("../models/shop_promotion");

    shop_promotion.find({},function(err, doc){
        if(err) {
            console.log(err.message)
        }else{
            res.send(doc);
        }
    });
});

module.exports = router;