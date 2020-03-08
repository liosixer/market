let mongoose = require("./db.js");

let GoodSchema = mongoose.Schema({
    id: { type:Number, index:true, unique:true},
    category:{
        type: String,
        default: "蔬菜"
    },
    name:{type:String, default: ""},
    unit:{type:String, default: "袋"},
    unit_price:{type:Number, default: 0, min:0}
}, {versionKey:false, timestamps:true})

let GoodModel = mongoose.model("Good", GoodSchema, "Goods");



/******************************************************************/

/**
 * @description 根据id获取商品对象
 * **/
GoodSchema.statics.findByItemId = ($id, $callback)=>{
    GoodModel.find({id:$id}, (err, docs)=>{
        $callback(err, docs);
    })
};


module.exports = GoodModel;