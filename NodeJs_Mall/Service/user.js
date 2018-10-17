let User = require("../Model/user");
let encryptUtil = require("../Utils/encryptUtil");

async function regist(user) {
    let result = await findByUser(user.username);
    if (result) {
        throw Error(`用户名${user.username}已经被占用`)
    }
    user.password = encryptUtil.md5Hmac(user.password, user.username)
    user.role = 0;
    result = await User.create(user);
    return result;
}

async function deleteUserByUsername(username) {
    await isExistByUsername(username);
    result = await User.deleteOne({username: username});
    if (result.n !== 1) {
        throw Error("删除失败")
    }
}

async function findByUser(username) {
    return User.findOne({username: username})

}

async function isExistByUsername(username) {
    let result = await findByUser(username)
    if (!result) {
        throw Error(`用户名为${username}的用户不存在`)
    }
}

async function login(user) {
    await isExistByUsername(username);
    let password = user.password;
    if (password == null || password.trim().length == 0) {
        throw Error("密码不能为空");
    }
    user.password = encryptUtil.md5Hmac(password, user.username)
    return await User.findOne(user)
}