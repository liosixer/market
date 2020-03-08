let mongoose = require("./db.js");

var CounterSchema = mongoose.Schema({
    _id: String ,
    sequence_value: {type:Number, default:10000}
}, {versionKey:false});

/**
 * @description 获取下一个队列索引
 * **/
CounterSchema.statics.getNextSequence = function (sequenceName) {
    let Counter = require("../models/counters");
    return Counter.findOneAndUpdate(
        {_id:sequenceName},
        {$inc:{sequence_value:1}}
    );
}

/**
 * @description 获取步进队列索引
 * **/
CounterSchema.statics.getStepSequence = function (sequenceName, step = 1) {
    let Counter = require("../models/counters");
    return Counter.findOneAndUpdate(
        {_id:sequenceName},
        {$inc:{sequence_value:step}});
}
/**
 * @description 获取当前Counter 队列的值 的 Promise
 * **/
CounterSchema.statics.getCurrentSequencePromise = function (sequenceName, $callback) {
    let Counter = require("../models/counters");
    return Counter.find({_id:sequenceName}, null, null, $callback);
},

/**
 * @description 重置counter
 * **/
CounterSchema.statics.resetCounter = function (sequenceName, count = 10000, options = {upsert:true}, $callback) {
    let Counter = require("../models/counters");
    return Counter.updateOne({_id:sequenceName}, {sequence_value:count}, options, $callback);
}

module.exports = mongoose.model("Counter", CounterSchema, "Counters");