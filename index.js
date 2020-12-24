console.log("hi!")

const express = require('express');
const app = express();
const config = require('./config/default')
const {log,logg,logr,logReq} = require('./utils/log')
const {clone} = require('./utils/clone')

//#region XML,JSON和Cookie支持
const bodyParser = require('body-parser')
// require('body-parser-xml')(bodyParser);
// app.use(bodyParser.xml({
//     limit: '1MB',   // Reject payload bigger than 1 MB
//     xmlParseOptions: {
//         normalize: true,     // Trim whitespace inside text nodes
//         normalizeTags: true, // Transform tags to lowercase
//         explicitArray: false // Only put nodes in array if >1
//     }
// }));
// app.use(bodyParser.text({type: '*/xml'}));
// 最大文件50mb
app.use(bodyParser.json({limit: '50mb'})); // json支持
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// cookieParser
// const cookieParser = require('cookie-parser')
// app.use(cookieParser())
//#endregion

//#region 解决跨域问题

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
const cors = require("cors")
app.use(cors())
//#endregion
//#region 通用处理
app.use((req, res, next)=>{
    logReq(req)
    // axios的数据直接存在body对象里面
    // wx.request的数据则存在body.data里面
    // 为了兼容两者,如果body没有data,则把body复制一下存到data里面
    // 统一从req.body.data获取数据
    if(!req.body.data) {
        let data = clone(req.body)
        req.body = {}
        req.body.data = data
    }

    next()
})
//#endregion
//region 路由
const router = require("./router");
app.use("/", router);
// endregion
//#region http服务
let http = require("http");
let http_server = http.createServer(app);
http_server.listen(config.port, config.ip)
logg("启动服务器 : http://" + config.ip + ":" + config.port)
//#endregion