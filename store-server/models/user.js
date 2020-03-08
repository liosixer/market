let mongoose = require("./db.js");

// 定义订单数据摘要
let UserSchema = mongoose.Schema({
    id:String,
    mobile: {type:String, required:true, index:true, unique:true},
    delivery_info: {
        type: Array,
        default: [ {
            name:{
                type:String,
                default: "",
                trim: true
            },
            mobile:{
                type:String
            },
            address:{
                type:String,
                default:"",
                trim: true
            }
        }]
    },
    create_at:{type:Number, default:Date.now},
    update_at:{type:Number, default:Date.now}
}, {versionKey:false,
    timestamps: { createdAt: 'create_at', updatedAt: 'update_at'}});


// 定义订单数据模型
let UserModel = mongoose.model("User", UserSchema, "Users");

// /**
//  * 保存用户数据
//  * **/
// UserSchema.statics.save = function(user){
//     let counter = require("./counters");
//     let userM = new UserModel(user);
//
//     counter.getCurrentSequencePromise("User", (err, doc)=>{
//         if (err) return;
//         let currentSequence = docs[0].sequence_value+1;
//         userM.id =
//     })
// }

module.exports = UserModel;