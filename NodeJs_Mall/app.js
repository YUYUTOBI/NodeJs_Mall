// 引入异常捕获处理
require('express-async-errors');
//引入dib
require('./db')
const config = require('./config');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const express = require('express')
const app = express();

//注册中间件
// log中间件
app.use(morgan('combined'));

//注册自定义的中间件

// 注册body-parser中间件
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 注册路由
//app.use("/users", require('./router/account'));

// 注册异常处理中间件
app.use((err, req, res, next)=>{
    res.fail(err.toString())
});

console.log(config)
//启动
app.listen(config.PORT);