// 引入异常捕获处理
require('express-async-errors');

//引入dib
require('./db')

const config = require('./config');
const morgan = require('morgan')
const express = require('express')
const app = express();

//使用日志功能
app.use(morgan('combined'));

//注册自定义的中间件
app.use(require("./Middleware/response_md"));
app.use(require("./Middleware/token_md"));
app.use(require("./Middleware/permission_md"));



// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

// 注册路由
app.use("/users", require("./Router/user"));
app.use("/categoty", require("./Router/categoty"));
app.use("/product", require("./Router/product"));
app.use("/order", require("./Router/order"))

// 注册异常处理中间件
app.use((err, req, res, next) => {
    res.fail(err.toString())
});

console.log(config)
//启动
app.listen(config.PORT);