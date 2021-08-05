const router = require("express").Router();
const controller = require("../constrollers/customer.controller");

router.get("/city", controller.countCustomersByCity);
router.get("/:id", controller.customerById);
router.put("/:id", controller.updateCustomerById),
router.get("/city/:city", controller.customersByCity);

module.exports = router;