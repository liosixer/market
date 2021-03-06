var express = require('express');
var router = express.Router();

/* GET OrderDetail:id */
router.get('/detail/:id', function(req, res, next) {
    var order = require("../models/order");

    console.log("订单详情");
    res.send(req.params);
});



/* GET home page. */
router.get('/list/:mobile', function(req, res, next) {
    let OrderModel = require("../models/order");
    let day = new Date();

    var preDay = day.getTime() - 3*24*60*60*60;
    OrderModel.find( {
        mobile:req.params.mobile,
        // status: OrderModel.STATUS_UNDETERMINED,
        create_at:{
            "$gte": preDay
        }})
        .sort({create_at:-1})
        .exec((err,doc)=>{
            if (err) {
                return res.json({ err_code: -1,
                    message: err.message});
            }
            res.send({err_code:0, list:doc.length > 0 ? doc:[]});
        })
});


//----------------------------------------------------//

router.post("/save", function(req, res, next){
    let OrderModel = require("../models/order");
    let Counter = require("../models/counters");
    let UserModel = require("../models/user");

    //定义订单orderModel
    // let orderM = new OrderModel(req.body);
    //
    // let userM = new UserModel({
    //     mobile:orderM.mobile
    // });
    // //有就修改， 没有就添加上去
    // UserModel.findOneAndUpdate({mobile:userM.mobile}, {mobile: orderM.mobile}, {upsert:true});

    if (orderM.id == 0) {
        //保存当前订单
        Counter.getCurrentSequencePromise("Order", (err, docs)=>{
            if (err) return;
            let currentSequence = docs[0].sequence_value+1;
            orderM.id = currentSequence;
            //变更状态 - 待确认状态
            orderM.status = 1;
            orderM.save((err)=>{
                if(err){
                    return res.json({
                        err_code: -1,
                        message: err.message
                    });
                }
                //通知客户端
                res.send({err_code:0});
                //自增数列
                Counter.getNextSequence("Order").exec();
            })
        })
    }else{

        OrderModel.findOneAndUpdate({id:orderM.id},
            null,
            null,
            (err,docs)=>{
                if (err){
                    return res.json({err_code:-1,
                        err_msg:err.message});;
                }
            })
    }
});


router.get("/cancel/:id", function (req,res,next) {
    let OrderModel = require("../models/order");

    OrderModel.findOneAndUpdate({id:req.params.id},
        {status:OrderModel.STATUS_CANCEL_BY_USER},
        {},
        (err,doc)=>{
        if (err){
            return res.json({
                            err_code:-1,
                            err_msg:err.message
                        });
        }
        res.status(200).send({err_code:0})
    })
})

router.get("/manager/:status", function (req,res,next) {
    let OrderModel = require("../models/order");
    let utils = require("../utils/utils");
    let day = new Date();
    let status = req.params.status;
    //订单状态 0 创建 1待确认 2分拣中 3用户取消订单 4 商户取消订单 5配送中 6 订单完成
    let query = status == -1 ? {"$in":[1,2,4,5,6]} : {"$eq": status};
    var preDay = day.getTime() - 3*24*60*60*60;
    OrderModel.find( {status: query})
        .sort({create_at:-1})
        .exec((err,doc)=>{
            if (err) {
                return res.json({ err_code: -1,
                    message: err.message});
            }
            res.send({err_code:0, list:doc.length > 0 ? doc:[]});
        })
})

router.post("/manager/change", function (req,res,next) {
    let OrderModel = require("../models/order");
    OrderModel.findOneAndUpdate({id:req.body.id},
        {status:req.body.status},
        {},
        (err,doc)=>{
            if (err){
                return res.json({
                    err_code:-1,
                    err_msg:err.message
                });
            }
            res.status(200).send({err_code:0})
        })
})



module.exports = router;