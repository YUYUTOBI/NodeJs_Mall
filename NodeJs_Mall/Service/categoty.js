let Category = require("../Model/category");
let config = require("../Config");

async function addItem(category) {
    let result = await Category.findOne({name: category.name});
    if (result) {
        throw Error(`名字为${category.name}的类别已经存在`)
    }
    result = await Category.create(category);
    return result;
}

async function deleteById(id) {
    let result = await Category.findOne({_id: id});
    if (!result) {
        throw Error(`ID为${id}的数据不存在`)
    }
    result = await Category.deleteOne({_id: id});
    if (result.n == 1) {
        throw Error(`删除ID为${id}的数据失败`)
    }
}

async function updateById(id, category) {
    let result = await Category.findOne({_id: id});
    if (!result) {
        throw Error(`ID为${id}的数据不存在`)
    }
    result = await Category.updateOne({_id: id}, category);
    if (result.n !== 1) {
        throw Error(`更新ID为${id}的数据失败`)
    }

}

async function findByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_SIZE;
    return await Category.find().skip(offset).limit(config.PAGE_SIZE);

}

module.exports = {
    addItem,
    deleteById,
    updateById,
    findByPage
}