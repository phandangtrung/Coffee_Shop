const mongoose = require("mongoose");
const Order = require("../models/orders");
const { products } = require("../models/products");
const Branch = require("../models/branches");

const { validationResult } = require("express-validator");

const HttpError = require("../error-handle/http-error");

const { create_payment, execute_payment } = require("../middleware/paypal");

const payment = async (req, res, next) => {
  const itemsList = JSON.parse(req.body.itemsList);
  let total;
  total = 0;
  for (i = 0; i < itemsList.length; i++) {
    total += parseFloat(itemsList[i].price) * parseFloat(itemsList[i].quantity);
  }
  console.log(total);
  console.log(itemsList);
  create_payment(itemsList, total);
  payment.payment.create_payment(
    create_payment_json,
    function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.status(200).json({ link: payment.links[i].href });
          }
        }
      }
    }
  );
};

const success = async (req, res, next) => {
  const payerId = req.params.payerID;
  const paymentId = req.params.paymentId;
  4;

  execute_payment(payerId);
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        var responseHTML =
          '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>';
        responseHTML = responseHTML.replace(
          "%value%",
          JSON.stringify({
            message: "Success",
            errorCode: 0,
          })
        );
        res.status(200).send(responseHTML);
      }
    }
  );
};

const cancel = async (req, res, next) => {
  res.status(200).json({ message: "Cancel", errorCode: 1 });
};

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
    productList: req.body.productList,
    quantity: req.body.quantity,
    branchId: req.body.branchId,
    userId: req.body.userId,
  };
  const BrId = req.params.bid;
  const branches = Branch.findById({ branchId: BrId });
  if (branches.exists) {
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

        let branchInfo;
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

const createOrderNew = async (req, res, next) => {
  const createOrder = {
    customerName: req.body.customerName,
    customerAddress: req.body.customerAddress,
    customerPhone: req.body.customerPhone,
    totalPrices: req.body.totalPrices,
  };

  const listProducQuantity = req.body.productList;

  try {
    const newOrder = new Order(createOrder);
    console.log(1);
    for (const productQuantity in listProducQuantity) {
      let product;
      console.log(listProducQuantity[productQuantity].productId);
      product = await products.findById(
        listProducQuantity[productQuantity].productId
      );
      console.log(product);
      //Add a embedded document in array
      newOrder.productList.push({
        pro: product,
        quantity: listProducQuantity[productQuantity].quantity,
      });
    }
    newOrder.markModified("order.productList");
    console.log(newOrder.productList);
    await newOrder.save();
    res.status(200).json({
      newOrder,
    });
  } catch (error) {
    return res.status(422).send(error);
  }
};

module.exports = {
  createOrder,
  updateOrderById,
  deleteOrderById,
  getOrderById,
  getAllOrder,
  getOrderByUserId,
  payment,
  success,
  cancel,
  createOrderNew,
};
