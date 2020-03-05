var mongoose =  require("mongoose");
//建立连接
// mongodb+srv://<username>:<password>

var localUrl = "mongodb://127.0.0.1:27017/test";
var market_release = 'mongodb+srv://liosixer:liosixer2db@cluster0-ecuo5.azure.mongodb.net/' +
    'market?retryWrites=true&w=majority';
var market_test = 'mongodb+srv://liosixer:liosixer2db@cluster0-ecuo5.azure.mongodb.net/' +
    'test?retryWrites=true&w=majority';

var url = market_test;
mongoose.connect(url,
    {useNewUrlParser:true, useUnifiedTopology: true },
    (err)=>{
    if (err){
        console.log(err);
        retrun;
    }
    console.log("【数据库" + url + "】连接成功");
});

module.exports = mongoose;