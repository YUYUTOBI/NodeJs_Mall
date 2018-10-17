let userService = require("../Service/user");
let router = require("express").Router();
let config = require("../Config");
let encryptUtil = require("../Utils/encryptUtil");
router.post("/", async (request, response) => {
    let result = await userService.regist(request.body);
    response.success(result)
})
router.delete("/:username", async (request, response) => {
    await userService.deleteUserByUsername(request.params.username)
    response.success();
})
router.get("/:username", async (request, response) => {
    let result = await userService.findByUsername(request.params.username);
    if (result) {
        response.success(result)
    } else {
        throw Error(`用户名为${username}的用户不存在`)
    }
})
router.post("/login", async (request, response) => {
    let result = await userService.login(request.body);
    let token = {
        username: user.username,
        expire: date.now() + config.TOKEN_EXPIRE
    }
    let encrypt = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);
    response.success(encrypt);
})
module.exports=router