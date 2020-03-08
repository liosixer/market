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
    let utils = require("../utils/utils");
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
    let orderM = new OrderModel(req.body);

    let userM = new UserModel({
        mobile:orderM.mobile
    });
    //有就修改， 没有就添加上去
    UserModel.findOneAndUpdate({mobile:userM.mobile}, {mobile: orderM.mobile}, {upsert:true});

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
    res.send({err_code:0});
});


router.get("/cancel/:id", function (req,res,next) {
    let OrderModel = require("../models/order");
    // OrderModel.find({id:req.params.id}, (err, doc)=>{
    //     if (err) {
    //         return res.json({
    //             err_code:-1,
    //             err_msg:err.message
    //         });
    //     }
    //
    //     var orderM = new OrderModel(doc[0]);
    //     orderM.status = OrderModel.STATUS_CANCEL;
    //     //取消订单成功后返回
    //     OrderModel.save().then(()=>{
    //         res.status(200).send({err_code:0});
    //     });
    // })

    OrderModel.findOneAndUpdate({id:req.params.id},
        {status:OrderModel.STATUS_CANCEL},
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