let User = require("../Model/user");
let encryptUtil = require("../Utils/encryptUtil");

async function regist(user) {
    let result = await findByUsername(user.username);
    if (result) {
        throw Error(`用户名${user.username}已经被占用`)
    }
    user.password = encryptUtil.md5Hmac(user.password, user.username)
    user.role = 0;
    result = await User.create(user);
    result.password = "";
    return result;
}

async function deleteUserByUsername(username) {
    await isExistByUsername(username);
    result = await User.deleteOne({username: username});
    if (result.n !== 1) {
        throw Error("删除失败")
    }
}

async function findByUsername(username) {
    return await User.findOne({username: username})
}

async function isExistByUsername(username) {
    let result = await findByUsername(username)
    if (!result) {
        throw Error(`用户名为${username}的用户不存在`)
    }
}

async function login(user) {
    await isExistByUsername(user.username);
    let password = user.password;
    if (password == null || password.trim().length == 0) {
        throw Error("密码不能为空");
    }
    user.password= encryptUtil.md5Hmac(password,user.username)
    console.log(user.password+"-------")
    user = await User.findOne(user);
    user.password = "";
    return user;
}

module.exports = {
    regist,
    login,
    deleteUserByUsername,
    findByUsername
}