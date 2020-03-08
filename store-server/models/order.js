let mongoose = require("./db.js");

let GoodSchema = mongoose.Schema({
    name:{type:String, default: "", required: true},
    count:{type:Number, default: 1, required: true}
});

let DeliverySchema = mongoose.Schema({
    realname:{ type:String, default: "", trim: true, required: true },
    mobile:{ type:String, trim: true, required: true },
    address:{ type:String, default:"", trim: true, required: true }
});

// 定义订单数据摘要
let OrderSchema = mongoose.Schema({
    id:{type:Number, default:0, index:true},
    comment: {type:String, default:""},
    item_list: { type:[GoodSchema], required:true},
    mobile: {type:String, required:true, maxlength:11, minlength:11, index:true},
    delivery_info:{type:DeliverySchema, required:true},
    status:{ type:Number, default:0, enum:[0,1,2,3,4,5], index:true},  //订单状态 0 创建 1待确认 2确认 3取消订单
    create_at:{type:Number, default:Date.now},
    update_at:{type:Number, default:Date.now}
}, {versionKey:false,
    timestamps: { createdAt: 'create_at', updatedAt: 'update_at'}});


OrderSchema.statics.ERROR_ORDER_SAVE = "ERROR_ORDER_SAVE";
OrderSchema.statics.ERROR_ORDER_UPDATE = "ERROR_ORDER_UPDATE";

//订单状态 0 创建 1待确认 2确认 3取消订单 4 配送中 ； 5 订单完成
OrderSchema.statics.STATUS_UNDETERMINED = 1;
OrderSchema.statics.STATUS_CHECKED      = 2;
OrderSchema.statics.STATUS_CANCEL       = 3;
OrderSchema.statics.STATUS_DISPATCHING  = 4;
OrderSchema.statics.STATUS_DONE         = 5;

// 定义订单数据模型
let OrderModel = mongoose.model("Order", OrderSchema, "Orders");

module.exports = OrderModel;