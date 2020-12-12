const mongoose = require("mongoose");
const Shipper = require("../models/shippers");
const Product = require("../models/products");
const Category = require("../models/categories");

const { validationResult } = require("express-validator");

const HttpError = require("../error-handle/http-error");

const createShipper = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid Input! Pls check your data", 400);
    return next(error);
  }
  const createShipper = {
    name: req.body.name,
    phone: req.body.phone,
    imagesShipper: req.file.path,
    point: req.body.point,
    createAt: req.body.createAt,
  };
  try {
    const newShippers = new Shipper(createShipper);
    await newShippers.save();
    res.status(200).json({
      message: "Create success",
      newShippers,
    });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      // Duplicate username
      return res.status(422).send({ message: "Shipper already exist!" });
    }
    return res.status(422).send(error);
  }
};

const updateShipperById = async (req, res, next) => {
  const errors = validationResult(req);
  const ShipId = req.params.sid;
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid Input! Pls check your data", 400);
    return next(error);
  }
  const updatedShipper = {
    name: req.body.name,
    phone: req.body.phone,
    imagesShipper: req.file.path,
    point: req.body.point,
    createAt: req.body.createAt,
  };
  let shippers;
  shippers = await Shipper.findByIdAndUpdate(ShipId, updatedShipper);
  res.status(200).json({ shippers: updatedShipper });
};

const deleteShipperById = async (req, res, next) => {
<<<<<<< HEAD
  const ShipId = req.params.sid;
  let shippers;
  try {
    shippers = await Shipper.findByIdAndDelete(sid);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not delete", 500);
    return next(error);
  }
  if (!shippers) {
    const error = new HttpError("Could not find any Shipper", 404);
    return next(error);
  }
  res.status(200).json({ message: "Deleted Shipper successfull" });
};
=======
    const ShipId = req.params.sid;
    let shippers;
    try{
        shippers = await Shipper.findByIdAndDelete(ShipId);
    }
    catch (err) {
        const error = new HttpError('Something went wrong, can not delete', 500);
        return next(error);
    }
    if(!shippers)
    {
        const error =  new HttpError('Could not find any Shipper', 404);
        return next(error);
    }
    res.status(200).json({message: 'Deleted Shipper successfull'});
}
>>>>>>> Cuong

const getAllShipper = async (req, res, next) => {
  let shippers;
  try {
    shippers = await Shipper.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not find any shipper",
      500
    );
    return next(error);
  }
  console.log(shippers);
  if (!shippers) {
    const error = new HttpError("Could not find any shipper", 404);
    return next(error);
  }
  res.status(200).json({ shippers });
};

const getshipperById = async (req, res, next) => {
  const ShipId = req.params.sid;
  let shippers;
  try {
    shippers = await Shipper.findById(ShipId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a shipper.",
      500
    );
    return next(error);
  }

  if (!shippers) {
    const error = new HttpError(
      "Could not find a shipper for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ shippers: shippers.toObject({ getters: true }) });
};

module.exports = {
  createShipper,
  updateShipperById,
  deleteShipperById,
  getAllShipper,
  getshipperById,
};
