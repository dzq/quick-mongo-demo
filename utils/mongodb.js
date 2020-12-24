const config = require('../config/default')
const {log,logg,logr,logReq} = require('./log')
// 数据库
const mongoose = require("mongoose")
mongoose.connect(config.url,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex:true,
    useUnifiedTopology: true
})
const db = mongoose.connection;

db.once('open' ,() => {
    logg('连接数据库成功')
})

db.on('error', function(error) {
    logr('Error in MongoDb connection: ' + error)
    mongoose.disconnect();
});

db.on('close', function() {
    logr('数据库断开，重新连接数据库')
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

module.exports = mongoose;