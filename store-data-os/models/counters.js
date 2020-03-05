let mongoose = require("./db.js");

var CounterSchema = mongoose.Schema({
    _id: String ,
    sequence_value: {type:Number, default:10000}
})

module.exports = mongoose.model("Counter", CounterSchema, "Counters");