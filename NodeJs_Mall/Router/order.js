let orderSrevice = require("../Service/order");
let router = require("express").Router();
router.post("/", async (request, response) => {
    let result = await orderSrevice.addItem(request.body);
    response.success(result)

})
router.get("/", async (request, response) => {
    let page = request.query.page;
    let result = await orderSrevice.findByPage(page);
    response.success(result)
})


module.exports = router;