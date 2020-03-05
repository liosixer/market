
let good = true;
let order = true;
let user = true;

let CounterModel = require('../models/counters');


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
                .then(()=> {
                    CounterModel.find({}, (err, doc) => {
                        if (err) {
                            return;
                        }
                        console.log(doc);
                    })
                })
        })
}




