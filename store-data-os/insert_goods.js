
function inertGoods(){
    var fs = require('fs'); //文件模块

    //读取配置文件，变量config的类型是Object类型
    var goods = require('./goods.json');

    let GoodModel = require("./models/good.js");

    let utils = require("./common/utils");
    //先移除数据，再新增数据
    GoodModel.deleteMany()
        .then(()=>{
                for (let i = 0; i < goods.length; i++) {
                    let good = goods[i];
                    good._id = utils.getNextSequence("Good");
                    GoodModel.insert(goods)}
                }

            )
        .then(()=> {
            GoodModel.find({}, (err, docs) =>{
                if (err){
                    console.log(err);
                    return;
                }
                console.log(docs);
            })
        })
        .catch(err => {console.log(err)});
}

module.exports = inertGoods;
