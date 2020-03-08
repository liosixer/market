
function inertGoods(){
    var fs = require('fs'); //文件模块

    //读取配置文件，变量config的类型是Object类型
    var goods = require('./goods.json');

    let GoodModel = require("./models/good.js");

    let Counter = require("./models/counters");
    Counter.resetCounter("Good")
        .then(()=>{
            //先移除数据，再新增数据
            GoodModel.deleteMany()
                .then(()=>{
                    let total = goods.length;
                    //获取Good 的 当前sequence
                    Counter.getCurrentSequencePromise("Good", (err, doc)=>{
                        if (err) return;
                        let curSequence = doc[0].sequence_value;
                        for (let i = 0; i < total; i++) {
                            let good = goods[i];
                            curSequence++;
                            // good.id = good._id = curSequence;
                            good.id = curSequence;
                        }
                        GoodModel.insertMany(goods);
                        Counter.getStepSequence("Good", total);
                    })
                })
        })
}

module.exports = inertGoods;
