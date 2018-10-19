module.exports = function (request, response, next) {
    response.success = (data = null) => {
        response.send({
            code: 0,
            msg: "操作成功",
            data: data
        })
    };
    response.fail = (msg) => {
        response.send({
            code: -1,
            msg: msg
        })
    };

    next();
};