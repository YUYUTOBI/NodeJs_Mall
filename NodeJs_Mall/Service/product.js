let Product = require("../Model/product");
let config = require("../Config");

async function addItem(product) {
    let result = await Product.findOne({name: product.name});
    if (result) {
        throw Error(`名字为${product.name}的商品已存在`)
    }
    await Product.create(product)
    return product
}

async function deleteById(id) {
    let result = await Product.findOne({_id: id});
    if (!result) {
        throw Error(`ID为${id}的商品不存在`)
    }
    result = await Product.deleteOne({_id: id})
    if (result.n !== 1) {
        throw Error("删除商品失败")
    }
}

async function updateById(id, product) {
    let result = await Product.findOne({_id: id});
    if (!result) {
        throw Error(`ID为${id}的商品不存在`)
        result = await Product.updateOne({_id: id}, product)
    }
    if (result.n !== 1) {
        throw Error("更新商品失败")
    }
}

async function findByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_SIZE
    return await Product.find().skip(offset).limit(config.PAGE_SIZE)
}

async function findById(id) {
    return await Product.findOne({_id: id})

}

module.exports = {
    addItem,
    deleteById,
    updateById,
    findByPage,
    findById
}