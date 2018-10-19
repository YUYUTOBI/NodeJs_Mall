let ProductService = require("../Service/product");
let router = require("express").Router();

router.post("/", async (request, response) => {
    let result = await ProductService.addItem(request.body);
    response.success(result)
})
router.delete("/:id", async (request, response) => {
    let id = request.params.id;
    await ProductService.deleteById(id);
    response.success();
})
router.put("/:id", async (request, response) => {
    let id = request.params.id;
    let body = request.body;
    await ProductService.updateById(id, body)
    response.success();
})
router.post("/", async (request, response) => {
    let page = request.query.page;
    let result = await ProductService.findByPage(page)
    response.success(result)
})
module.exports = router
