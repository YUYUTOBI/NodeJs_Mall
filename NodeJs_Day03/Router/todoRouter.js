let down = require("../Service/todoservice");
const router = require("express").Router();
router.post("/",async (request,response)=>{
    let body = request.body;
    let result = await down.addtodo(body);
    response.send({
        code:1,
        msg:"操作成功",
        data:result})
})
router.delete("/:id",async (request,response)=>{
    let id = request.params.id;
    await  down.deletetodo(id)
    response.send({
        code:1,
        msg:"操作成功"
    })
})
router.put("/:id",async(request,response)=>{
    let id = request.params.id;
    let body = request.body;
    await down.updateOne(id,body)
    response.send({
        code:1,
        msg:"操作成功"
    })
})
router.get("/",async (request,respons)=>{
    let result = await down.findAll();
    respons.send({
        code:1,
        msg:"操作成功",
        data:result
    })
})
module.exports=router



