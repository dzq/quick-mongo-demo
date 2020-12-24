const express = require("express");

// 注册路由
const router = express.Router();
router.get("/", function(req, res) {
    res.end("demo");
});
router.post("/", function(req, res) {
    res.end("demo");
});

module.exports = router;