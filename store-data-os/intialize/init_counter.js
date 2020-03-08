
let good = false;
let order = true;
let user = true;

let CounterModel = require('../models/counters');

// CounterModel.deleteMany()
if (good){
    //添加商品counter;
    CounterModel.deleteOne({_id:"Good"})
        .then(()=>{
            new CounterModel({
                _id: "Good"
            }).save()
        })

}

if (order){
    //添加用户counter;
    CounterModel.deleteOne({_id:"Order"})
        .then(()=>{
            new CounterModel({
                _id: "Order"
            }).save()
        })
}

if (user){
    //添加用户counter;
    CounterModel.deleteOne({_id:"User"})
        .then(()=>{
            new CounterModel({
                _id: "User"
            }).save()
        })
}

// if (order){
//     //添加用户counter;
//     CounterModel.deleteOne({_id:"Order"})
//         .then(()=>{
//             new CounterModel({
//                 _id: "Order"
//             }).save()
//         })
// }




