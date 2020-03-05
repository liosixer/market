let mongoose = require("./db.js");

let GoodSchema = mongoose.Schema({
    category:{
        type: String,
        default: "蔬菜"
    },
    name:{type:String, default: ""},
    unit:{type:String, default: "袋"},
    unit_price:{type:Number, default: 0, min:0}
})

let GoodModel = mongoose.model("Good", GoodSchema, "Goods");

module.exports = GoodModel;