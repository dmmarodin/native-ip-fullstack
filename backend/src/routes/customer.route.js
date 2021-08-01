const router = require("express").Router();
const controller = require("../constrollers/customer.controller");

router.get("/cities", controller.countCustomersByCity);

router.get("/:id", controller.customerById);

module.exports = router;