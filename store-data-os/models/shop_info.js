let mongoose = require("./db.js");

let ShopInfoSchema = mongoose.Schema({
    name:{type: String, default: ""},
    tel:{type:String, default: ""},
    address:{type:String, default: ""},
    logo:{type:String, default: ""}
})

module.exports = mongoose.model("ShopInfo", ShopInfoSchema, "ShopInfo");