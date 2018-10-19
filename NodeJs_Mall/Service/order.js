let Order = require("../Model/order");
let productSrevice = require("./product");
const Big = require('big.js');
let config = require("../Config");

async function addItem(order) {
    let product = await productSrevice.findById(order.productId)
    if (!product) {
        throw Error(`ID为${order.productId}的商品不存在`)
    }
    order.productName = product.name;
    order.productPrice = product.price
    if (order.count > product.stock) {
        throw Error("库存不足，请修改购买数量")
    }
    let price = product.price;
    let total = Big(price).times(order.count);
    order.total = total;
    let result = await Order.create(order);
    await productSrevice.updateById(order.productId, {stock: product.stock - order.count})
    return result;
}


async function findByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_SIZE
    let result = await Order.find().skip(offset).limit(config.PAGE_SIZE);
    return result;
}

module.exports = {
    addItem,
    findByPage
}