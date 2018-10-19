let encryptUtil = require("../Utils/encryptUtil");
let config = require("../Config");
let userService = require("../Service/user");

function checkUrl(url) {
    let ignoreUrls = [
        /\/user\/regist/,
        /\/user\/login/
    ]
    let isNeedcheck = true;
    for (let i = 0; i < ignoreUrls.length; i++) {
        let ignoreUrl = ignoreUrls[i];
        if (ignoreUrl.test(url)) {
            isNeedcheck = false;
            break;
        }
    }
}

//用户是否登陆校验
module.exports = function (request, response, next) {
    let url = request.url();
    let encryptedToken = null;
    if (checkUrl(url)) {
        let token = request.get("token");
        if (!token) {
            throw Error("您还没登陆，请登陆后重试")
        }
        try {
            encryptedToken = encryptUtil.aesDecrypt(JSON.stringify(token), config.TOKEN_KEY);
        } catch (e) {
            throw Error("数据和许可证不一致，请登陆后重试");
        }
        let parseToken = JSON.parse(encryptedToken);
        let expire = parseToken.expire;
        if (Data.now() > expire) {
            throw Error("许可证已过期，请重新登陆");
        }
        let username = parseToken.username;
        let user = userService.findByUsername(username);
        if (!user) {
            throw Error("许可证无效，请重新登陆")
        }
        request.user = user;
    }
    next();
};