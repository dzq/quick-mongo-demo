const chalk = require('chalk')
let fs = require('fs');

let options = {
    flags: 'a',     // append模式
    encoding: 'utf8',  // utf8编码
};

let stdout = fs.createWriteStream('./log/stdout.log', options);
let stderr = fs.createWriteStream('./log/stderr.log', options);

// 创建logger
let logger = new console.Console(stdout, stderr);

/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
}

/**
 * log
 * @param o
 */
function log (o){
    console.log(o)
}
/**
 * logg
 *  输出绿色重要信息
 * @param o
 */
function logg (o){
    time = dateFormat('yyyy-MM-dd HH:mm:ss.fff', new Date());
    o = `[${time}] - ${o} `
    console.log(chalk.green(o))
    logger.log(o);
}
/**
 * logr
 *  输出红色log 用于输出错误信息
 * @param o
 */
function logr (o){
    time = dateFormat('yyyy-MM-dd HH:mm:ss.fff', new Date());
    o = `[${time}] - ${o} `
    console.log(chalk.red(o))
    logger.log(o);
}
let o,time
function logReq (req){
    time = dateFormat('yyyy-MM-dd HH:mm:ss.fff', new Date());
    o = `[${time}] - ${getClientIP(req)} - ${req.url}  `
    console.log(o)
    // logger.log(o);
}

function dateFormat(format, date) {
    if (!format) {
        format = 'yyyy-MM-dd HH:mm:ss';
    }

    // 用0补齐指定位数
    let padNum = function (value, digits) {
        return Array(digits - value.toString().length + 1).join('0') + value;
    };

    // 指定格式字符
    let cfg = {
        yyyy: date.getFullYear(),             // 年
        MM: padNum(date.getMonth() + 1, 2),        // 月
        dd: padNum(date.getDate(), 2),           // 日
        HH: padNum(date.getHours(), 2),          // 时
        mm: padNum(date.getMinutes(), 2),         // 分
        ss: padNum(date.getSeconds(), 2),         // 秒
        fff: padNum(date.getMilliseconds(), 3),      // 毫秒
    };

    return format.replace(/([a-z]|[A-Z])(\1)*/ig, function (m) {
        return cfg[m];
    });
}
module.exports = { log , logReq, logg,logr,getClientIP}