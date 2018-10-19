const mongoose = require("mongoose");
let config = require("./Config");
mongoose.connect("mongodb://127.0.0.1/" + config.DB, {useNewUrlParser: true})
let mdb = mongoose.connection;
mdb.on("error", err => {
    console.log("数据库连接失败:" + err.toString())
})

mdb.once("open", () => {
    console.log("mongodb连接成功")
})