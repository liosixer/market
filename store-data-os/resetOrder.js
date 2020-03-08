
function resetOrder(){

    let OrderModel = require("./models/order.js");

    let Counter = require("./models/counters");
    //清除索引
    Counter.resetCounter("Order").then((results)=>{
        console.log("索引清理完毕")
    });
    //清除订单数据
    OrderModel.deleteMany().then((results)=>{
        console.log("订单数据清理完毕");
    });;
}

module.exports = resetOrder;