let mongoose = require("./db.js");

let ShopSchema = mongoose.Schema({
    notice: {
        type:String,
        default:""
    },
    items:[{
        id: String,
        discount:Number
    }],
    category_order: {
        type: Array,
        default: []
    }
})

let ShopPromotionModel = mongoose.model("ShopPromotion", ShopSchema, "ShopPromotion");

module.exports = ShopPromotionModel;