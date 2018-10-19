let permissions = [
    {
        role: 0,
        urls: [
            /\/category.*/,
            /\/product.*/,
            /\/order.*/,
        ]
    }, {
        role: 100,
        urls: [
            /.*/
        ]
    }
]
//权限的校验
module.exports = function (request, response, next) {
    let user = request.user;
    if (user) {
        let isGo = false;
        outer:for (let i = 0; i < permissions.length; i++) {
            let permission = permissions[i];
            if (user.role === permission.role) {
                let urls = permission.urls;
                for (let j = 0; j < urls.length; j++) {
                    let reqUrl = request.url;
                    let url = urls[i];
                    if (url.test(reqUrl)) {
                        isGo = true;
                        break outer;
                    }
                }
            }
        }
        if (!isGo) {
            throw Error("您暂时无权访问")
        }
    }
    next();
};