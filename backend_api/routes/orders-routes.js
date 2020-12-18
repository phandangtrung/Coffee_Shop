const express = require("express");
const { check } = require("express-validator");

const ordersController = require("../controller/orders-controllers");
const router = express.Router();

router.get("/", ordersController.getAllOrder);
router.get("/:oid", ordersController.getOrderById);
router.get("/:uid", ordersController.getOrderByUserId);

router.post("/", ordersController.createOrder);

router.put("/:oid", ordersController.updateOrderById);

router.delete("/:oid", ordersController.deleteOrderById);

module.exports = router;
