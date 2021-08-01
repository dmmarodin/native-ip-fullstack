const express = require("express");
const customerRoutes = require("./customer.route");

const router = express.Router();
router.use("/customer", customerRoutes);

module.exports = router;