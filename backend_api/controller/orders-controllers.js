const mongoose = require("mongoose");
const Order = require("../models/orders");
const Product = require("../models/products");

const { validationResult } = require("express-validator");

const HttpError = require("../error-handle/http-error");

const createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid Input! Pls check your data", 400);
    return next(error);
  }
  const createOrder = {
    customerName: req.body.customerName,
    customerAddress: req.body.customerAddress,
    customerPhone: req.body.customerPhone,
    totalPrices: req.body.totalPrices,
    status: req.body.status,
    note: req.body.status,
    createAt: req.body.createAt,
    doneAt: req.body.doneAt,
    productlist: req.body.productlist,
    userAddress: req.body.userAddress,
    userId: req.body.userId,
  };
  try {
    const newOrder = new Order(createOrder);
    await newOrder.save();
    console.log("Successfull");
    console.log(newOrder.productlist[0].product_id);
    console.log(newOrder.productlist.length);
    let i;
    for (i = 0; i < newOrder.productlist.length; i++) {
      console.log(i);
      productId = newOrder.productlist[i].product_id;

      let productInfo;
      productInfo = await Product.findById(productId);
      console.log(productInfo);

      let productQuantityUpdate;
      productQuantityUpdate =
        productInfo.quantity - newOrder.productlist[i].quantity;
      console.log(productQuantityUpdate);

      let productUpdate;
      const quantityUpdate = {
        quantity: productQuantityUpdate,
      };
      productUpdate = await Product.findByIdAndUpdate(
        productId,
        quantityUpdate
      );
    }
    res.status(200).json({
      message: "Create success",
      newOrder,
    });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      // Duplicate username
      return res.status(422).send({ message: "Order already exist!" });
    }
    return res.status(422).send(error);
  }
};

const updateOrderById = async (req, res, next) => {
  const errors = validationResult(req);
  const OrderId = req.params.oid;
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid Input! Pls check your data", 400);
    return next(error);
  }
  const updatedOrder = {
    status: req.body.status,
    doneAt: req.body.doneAt,
    shipperId: req.body.shipperId,
  };
  let orders;
  orders = await Order.findByIdAndUpdate(OrderId, updatedOrder);
  res.status(200).json({ message: "Order is confirmed", orders: updatedOrder });
};

const deleteOrderById = async (req, res, next) => {
  const OrderId = req.params.oid;
  let orders;
  try {
    orders = await Order.findByIdAndDelete(OrderId);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not delete", 500);
    return next(error);
  }
  if (!orders) {
    const error = new HttpError("Could not find any Order", 404);
    return next(error);
  }
  res.status(200).json({ message: "Deleted Order success" });
};

const getOrderById = async (req, res, next) => {
  const OrderId = req.params.oid;
  let orders;
  try {
    orders = await Order.findById(OrderId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a order.",
      500
    );
    return next(error);
  }

  if (!orders) {
    const error = new HttpError(
      "Could not find a order for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ orders: orders.toObject({ getters: true }) });
};

const getAllOrder = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not find any order",
      500
    );
    return next(error);
  }

  if (!orders) {
    const error = new HttpError("Could not find any order", 404);
    return next(error);
  }
  res.status(200).json({ orders });
};

const getOrderByUserId = async (req, res, next) => {
  let orders;
  const UserId = req.params.uid;
  try {
    orders = await Order.find({ userId: UserId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any user.",
      500
    );
    return next(error);
  }
  if (!orders) {
    const error = new HttpError(
      "Could not find a order for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ orders });
};

module.exports = {
  createOrder,
  updateOrderById,
  deleteOrderById,
  getOrderById,
  getAllOrder,
  getOrderByUserId,
};
