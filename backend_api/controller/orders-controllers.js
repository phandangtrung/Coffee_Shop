const mongoose = require('mongoose');
const Order = require('../models/orders');

const { validationResult } = require('express-validator');

const HttpError = require('../error-handle/http-error');

const createOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const createOrder = {
        name: req.body.name,
        quantity: req.body.quantity,
        prices: req.body.prices,
        status: req.body.status,
        ratings: req.body.ratings,
        userAddress: req.body.userAddress,
        userId : req.body.userId               
    };
    try {
        const newOrder = new Order(createOrder);
        await newOrder.save();
        res.status(200).json({
        message: "Create success", newOrder
    });
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        // Duplicate username
        return res.status(422).send({ message: 'Order already exist!' });
      }
      return res.status(422).send(error);
    };    
};

const updateOrderById = async (req, res, next) => {
    const errors = validationResult(req);
    const OrderId = req.params.oid;
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const updatedOrder = {
        name: req.body.name,
        quantity: req.body.quantity,
        prices: req.body.prices,
        status: req.body.status,
        ratings: req.body.ratings,
        userAddress: req.body.userAddress
      };
    let orders;
    orders = await Order.findByIdAndUpdate(OrderId, updatedOrder);
    res.status(200).json({orders: updatedOrder});
};

const deleteOrderById = async (req, res, next) => {
    const OrderId = req.params.oid;
    let orders;
    try{
        orders = await Order.findByIdAndDelete(OrderId);
    }
    catch (err) {
        const error = new HttpError('Something went wrong, can not delete', 500);
        return next(error);
    }
    if(!orders)
    {
        const error =  new HttpError('Could not find any Order', 404);
        return next(error);
    }
    res.status(200).json({message: 'Deleted Order success'});
}

const getOrderById = async (req, res, next) => {
    const OrderId = req.params.oid;
    let orders;
    try {
      orders = await Order.findById(oid);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a order.',500);
      return next(error);
    }
  
    if (!orders) {
      const error = new HttpError(
        'Could not find a order for the provided id.',404);
      return next(error);
    }
    res.json({ orders: orders.toObject({ getters: true }) }); 
  };

  const getAllOrder = async (req, res, next) => {
    let orders;
    try{
        orders = await Order.find();
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any order', 500);
        return next(error);
    };
  
    if(!orders.name)
    {
        const error =  new HttpError('Could not find any order', 404);
        return next(error);
    }
    res.status(200).json({categories});
  
  };

  const getOrderByUserId = async (req, res, next) => {
    let orders;
    const UserId = req.params.userId;
    try {
      orders = await Order.findOne({"userId": UserId});
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find any user.',500);
      return next(error);
    }
  
    if (!orders) {
      const error = new HttpError(
        'Could not find a order for the provided id.',404);
      return next(error);
    }
    res.json({ orders: orders.toObject({ getters: true }) }); 
  };


module.exports = {createOrder, updateOrderById, deleteOrderById, getOrderById, getAllOrder, getOrderByUserId};