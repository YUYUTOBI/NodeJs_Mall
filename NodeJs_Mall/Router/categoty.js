let CategotyService = require("../Service/categoty");
let router = require("express").Router();

router.post("/",async (request,response)=>{
    let result = await CategotyService.addItem(request.body);
    response.success(result)
})
router.delete("/:id",async (request,response)=>{
    let id = request.params.id;
    await CategotyService.deleteById(id);
    response.success();
})
router.put("/:id",async (request,response)=>{
    let id = request.params.id;
    let body = request.body;
    await CategotyService.updateById(id,body)
    response.success();
})
router.post("/",async (request,response)=>{
    let page = request.query.page;
  let result=  await CategotyService.findByPage(page)
    response.success(result)
})
module.exports=router
