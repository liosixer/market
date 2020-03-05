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
    }
})

// 定义订单数据模型
let OrderModel = mongoose.model("Order", OrderSchema, "Orders");

module.exports = OrderModel;