var mongoose =  require("mongoose");
//建立连接
// mongodb+srv://<username>:<password>
var market_test = 'mongodb+srv://liosixer:liosixer2db@cluster0-ecuo5.azure.mongodb.net/' +
    'test?retryWrites=true&w=majority';
var market_release = 'mongodb+srv://liosixer:liosixer2db@cluster0-ecuo5.azure.mongodb.net/' +
    'market?retryWrites=true&w=majority';
var localUrl = "mongodb://127.0.0.1:27017/test";

mongoose.connect(market_test,
    {useNewUrlParser:true, useUnifiedTopology: true },
    (err)=>{
    if (err){
        console.log(err);
        retrun;
    }
    console.log("数据库连接成功");
});

module.exports = mongoose;