
function insertShopPromotion() {
    var ShopPromotionModel = require("./models/shop_promotion");

    var promotionModel = new ShopPromotionModel({
        notice:"『备注』鲁花金龙鱼食用油，六个核桃，蒙牛伊利牛奶，散称9.5元/16元" +
            "/27元每斤的饼干，香飘飘系列奶茶，散称五香瓜子，八宝粥等均有售。" +
            "【另】满50元方可配送!【提醒】疫情期间，菜品价格以当日配送价格为准！",
        items: [],
        category_order: [ "副食", "干货及其他", "牛奶", "水果", "禽肉类", "蔬菜"]
    });

//先移除数据
    ShopPromotionModel.deleteMany()
        .then(()=> promotionModel.save())
        .then(() => {
            ShopPromotionModel.find({}, (err, doc)=>{
                if (err){
                    console.log(err);
                    return;
                }
                console.log(doc);
            })
        })
        .catch((err)=> console.log(err));
}

module.exports = insertShopPromotion;