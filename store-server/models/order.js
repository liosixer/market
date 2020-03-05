let mongoose = require("./db.js");

// 定义订单数据摘要
let OrderSchema = mongoose.Schema({
    comment: String,
    item_list: {
        type: Array,
        default: []
    },
    name:{
        type:String,
        default: "",
        trim: true
    },
    mobile:{
        type:String,

    },
    address:{
        type:String,
        default:"",
        trim: true
    },
    status:{
        type: Number,
        //订单状态一共： 0.创建订单 1. 创建中 2.创建完成 3.待确认 4.确认订单 5.完成订单
        default: 0
    }
})

// 定义订单数据模型
let OrderModel = mongoose.model("Order", OrderSchema, "Orders");

module.exports = OrderModel;