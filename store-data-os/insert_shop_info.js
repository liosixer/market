
function insertShopInfo() {
    var ShopInfoModel = require("./models/shop_info");

    var infoModel = new ShopInfoModel({
        "name": "仁智便利",
        "tel": "",
        "address": "猇亭区金猇路工行旁",
        "logo": ""
    });

//先移除数据
    ShopInfoModel.deleteMany()
        .then(()=> infoModel.save())
        .then(() => {
            ShopInfoModel.find({}, (err, doc)=>{
                if (err){
                    console.log(err);
                    return;
                }
                // console.log(doc);
            })
        })
        .catch((err)=> console.log(err));
}


module.exports = insertShopInfo;
