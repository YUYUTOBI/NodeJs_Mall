let User = require("../Model/todo");

async function findOne(id) {
    let result = await User.findOne({_id:id});
    if(!result){
        throw Error(`ID为${id}的数据不存在`)
    }
}

async function addtodo(todo) {
    let result = await User.findOne({content: todo.content});
    if (result) {
        throw Error("您添加的内容已存在")
    }
    result = await User.create(todo);
    return result
}

async function deletetodo(id) {
    await findOne(id)
    let result = await User.deleteOne({_id: id});
    if(result.n!==1){
        throw Error(`删除${id}的数据发生错误`)
    }
}

async function updateOne(id, todo) {
    await findOne(id)
     result = await User.updateOne({_id: id}, todo);
    if(result.n!==1){
        throw Error(`更新ID为${id}的数据发生错误`)
    }
}

async function findAll() {
    let result = await User.find();
    return result
}

module.exports = {
    addtodo,
    deletetodo,
    updateOne,
    findAll
}



