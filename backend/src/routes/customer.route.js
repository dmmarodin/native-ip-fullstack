const router = require("express").Router();
const controller = require("../constrollers/customer.controller");

router.get("/cities", controller.countCustomersByCity);
router.get("/:id", controller.customerById);
router.put("/:id", controller.updateCustomerById),
router.get("/cities/:city", controller.customersByCity);

module.exports = router;