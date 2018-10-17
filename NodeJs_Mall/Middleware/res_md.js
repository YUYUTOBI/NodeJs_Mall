module.exports = function (req, res, next) {
    res.success = (data = null) =>{
        res.send({
            code: 0,
            msg: "操作成功",
            data: data
        })
    };
    res.fail = (msg)=>{
        res.send({
            code: -1,
            msg: msg
        })
    };

    next();
};