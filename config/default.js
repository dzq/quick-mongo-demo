'use strict';
const port = 9008
const url = 'mongodb://localhost:27017/quickDemo'
// wisewing
// const ip = "192.168.0.229"
// const https = true
// local
const ip = "127.0.0.1"
const https = false

function getBaseUrl() {
    return ( https  ? "https" : "http" ) + "://" + ip + ":" + port
}

module.exports = {
    port: port,
    url: url,
    // 服务器配置
    // ip: "192.168.0.229",
    // https:true
    // 本地配置
    ip: ip,
    // ip: "192.168.1.151",
    https: https,
    getBaseUrl:getBaseUrl
}