const mongoose = require("mongoose");
const Product = require("../models/products");
const Category = require("../models/categories");

const { validationResult } = require("express-validator");

const HttpError = require("../error-handle/http-error");

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
<<<<<<< HEAD
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid Input! Pls check your data", 400);
    return next(error);
  }
  const createProduct = {
    name: req.body.name,
    size: req.body.size,
    prices: req.body.prices,
    quantity: req.body.quantity,
    description: req.body.description,
    alias: getAlias(req.body.name),
    images: req.file.path,
  };
  console.log(createProduct);
  try {
    const newProducts = new Product(createProduct);
    await newProducts.save();
    console.log(newProducts);
    res.status(200).json({
      message: "Create success",
      newProducts,
=======
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const createProduct = {
        name: req.body.name,
        size: req.body.size,
        prices: req.body.prices,
        quantity: req.body.quantity,
        createAt: req.body.createAt,
        description: req.body.description,
        alias: getAlias(req.body.name),
        images: req.file.path
        
    };
    console.log(createProduct)
    try {
        const newProducts = new Product(createProduct);
        await newProducts.save();
        console.log(newProducts);
        res.status(200).json({
        message: "Create success", newProducts
>>>>>>> Cuong
    });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      // Duplicate username
      return res.status(422).send({ message: "Product already exist!" });
    }
    return res.status(422).send(error);
  }
};

const updateProductbyId = async (req, res, next) => {
  const errors = validationResult(req);
  const ProId = req.params.pid;
<<<<<<< HEAD
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid Input! Pls check your data", 400);
    return next(error);
  }
  const updatedProduct = {
    name: req.body.name,
    size: req.body.size,
    prices: req.body.prices,
    quantity: req.body.quantity,
    description: req.body.description,
    alias: getAlias(req.body.name),
    images: req.file.path,
  };
  let products;
  products = await Product.findByIdAndUpdate(pid, updatedProduct);
  res.status(200).json({ products: updatedProduct });
};
=======
  if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const updatedProduct = {
      name: req.body.name,
      size: req.body.size,
      prices: req.body.prices,
      quantity: req.body.quantity,
      createAt: req.body.createAt,
      description: req.body.description,
      alias: getAlias(req.body.name),
      images: req.file.path
      
      };
    let products;
    products = await Product.findByIdAndUpdate(ProId, updatedProduct);
    res.status(200).json({products: updatedProduct});

}
>>>>>>> Cuong

const deleteProductById = async (req, res, next) => {
  const ProId = req.params.pid;
  let products;
<<<<<<< HEAD
  try {
    products = await Product.findOneAndDelete(ProId);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not delete", 500);
    return next(error);
=======
  try{
      products = await Product.findOneAndDelete(ProId);
  }
  catch (err) {
      const error = new HttpError('Something went wrong, can not delete', 500);
      return next(error);
>>>>>>> Cuong
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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductbyId,
  deleteProductById,
};
