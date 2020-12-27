const mongoose = require("mongoose");
const Product = require("../models/products");
const Category = require("../models/categories");

const { validationResult } = require("express-validator");

const HttpError = require("../error-handle/http-error");
const products = require("../models/products");

const getAlias = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str.toLowerCase().replace(/ /g, "-");
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid Input! Pls check your data", 400);
    return next(error);
  }

  let imagesCurrent;
  if (typeof req.file !== "undefined") {
    imagesCurrent = req.file.path;
  } else imagesCurrent = null;
  if (imagesCurrent === null) {
    const createProduct = {
      name: req.body.name,
      size_M: req.body.size_M,
      size_L: req.body.size_L,
      prices: req.body.prices,
      quantity: req.body.quantity,
      status: req.body.status,
      reviews: req.body.reviews,
      createAt: req.body.createAt,
      description: req.body.description,
      alias: getAlias(req.body.name),
      categoryId: req.body.categoryId,
    };
    console.log(createProduct);
    try {
      const newProducts = new Product(createProduct);
      await newProducts.save();
      console.log(newProducts);
      res.status(200).json({
        message: "Create success",
        newProducts,
      });
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        // Duplicate username
        return res.status(422).send({ message: "Product already exist!" });
      }
      return res.status(422).send(error);
    }
  } else {
    const createProduct = {
      name: req.body.name,
      alias: getAlias(req.body.name),
      size_M: req.body.size_M,
      size_L: req.body.size_L,
      prices: req.body.prices,
      quantity: req.body.quantity,
      status: req.body.status,
      reviews: req.body.reviews,
      createAt: req.body.createAt,
      description: req.body.description,
      imagesProduct: imagesCurrent,
      categoryId: req.body.categoryId,
    };
    console.log(createProduct);
    try {
      const newProducts = new Product(createProduct);
      await newProducts.save();
      console.log(newProducts);
      res.status(200).json({
        message: "Create success",
        newProducts,
      });
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        // Duplicate username
        return res.status(422).send({ message: "Product already exist!" });
      }
      return res.status(422).send(error);
    }
  }
};

const updateProductbyId = async (req, res, next) => {
  const errors = validationResult(req);
  const ProId = req.params.pid;
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid Input! Pls check your data", 400);
    return next(error);
  }
  let imagesCurrent;
  if (typeof req.file !== "undefined") {
    imagesCurrent = req.file.path;
  } else imagesCurrent = null;
  if (imagesCurrent === null) {
    const updatedProduct = {
      name: req.body.name,
      alias: getAlias(req.body.name),
      size_M: req.body.size_M,
      size_L: req.body.size_L,
      prices: req.body.prices,
      quantity: req.body.quantity,
      status: req.body.status,
      reviews: req.body.reviews,
      createAt: req.body.createAt,
      description: req.body.description,
    };
    try {
      let products;
      products = await Product.findByIdAndUpdate(ProId, updatedProduct);
      console.log(products);
      return res.status(200).json({
        message: "Update Product success",
        products: updatedProduct,
      });
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        // Duplicate username
        return res.status(422).send({ message: "Product already exist!" });
      }
      return res.status(422).send(error);
    }
  } else {
    const updatedProduct = {
      name: req.body.name,
      alias: getAlias(req.body.name),
      size_M: req.body.size_M,
      size_L: req.body.size_L,
      prices: req.body.prices,
      quantity: req.body.quantity,
      status: req.body.status,
      reviews: req.body.reviews,
      createAt: req.body.createAt,
      description: req.body.description,
      imagesProduct: imagesCurrent,
    };
    try {
      let products;
      products = await Product.findByIdAndUpdate(ProId, updatedProduct);
      console.log(products);
      return res.status(200).json({
        message: "Update Product success",
        products: updatedProduct,
      });
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        // Duplicate username
        return res.status(422).send({ message: "Product already exist!" });
      }
      return res.status(422).send(error);
    }
  }
};

const deleteProductById = async (req, res, next) => {
  const ProId = req.params.pid;
  let products;
  try {
    products = await Product.findByIdAndDelete(ProId);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not delete", 500);
    return next(error);
  }
  if (!products) {
    const error = new HttpError("Could not find any product", 404);
    return next(error);
  }
  res.status(200).json({ message: "Deleted product:" });
};

const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not find any product",
      500
    );
    return next(error);
  }
  console.log(products);
  if (!products) {
    const error = new HttpError("Could not find any product", 404);
    return next(error);
  }
  res.status(200).json({ products });
};

const getProductById = async (req, res, next) => {
  const ProId = req.params.pid;
  let products;
  try {
    products = await Product.findById(ProId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a product.",
      500
    );
    return next(error);
  }

  if (!products) {
    const error = new HttpError(
      "Could not find a product for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ products: products.toObject({ getters: true }) });
};

const getProductByCateId = async (req, res, next) => {
  const CateId = req.params.cid;
  let products;
  try {
    products = await Product.find({ categoryId: CateId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a product.",
      500
    );
    return next(error);
  }

  if (!products) {
    const error = new HttpError(
      "Could not find a product for the provided id.",
      404
    );
    return next(error);
  }
  res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductbyId,
  deleteProductById,
  getProductByCateId,
};
