const express = require("express");
const { check } = require("express-validator");
const { isAdmin, isAuth, isEmployee } = require("../middleware/uilt");

const ordersController = require("../controller/orders-controllers");
const router = express.Router();

router.get("/", ordersController.getAllOrder);

router.get("/payment/pay", ordersController.payment);
router.get("/payment/success", ordersController.success);
router.get("/payment/cancel", ordersController.cancel);

router.get("/:oid", ordersController.getOrderById);
router.get("/user/:uid", ordersController.getOrderByUserId);

// router.post("/", ordersController.createOrder);
router.post("/create/order", ordersController.createOrderNew);

router.use(isEmployee, isAdmin);

router.put("/:oid", ordersController.updateOrderById);

router.delete("/:oid", ordersController.deleteOrderById);

router.use(isAdmin);

router.get("/revenue", ordersController.getRevenue);

module.exports = router;
