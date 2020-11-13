const mongoose = require('mongoose');
const Product = require('../models/products');
const Category = require('../models/categories');

const { validationResult } = require('express-validator');

const HttpError = require('../error-handle/http-error');
const products = require('../models/products');


const createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    let categories;
    try {
      categories = await Category.findById(req.body.categoryId)
    } catch (err) {
      const error = new HttpError('Something went wrong, coud not find any category', 500);
      return next(error);
    }
    if(!categories.name)
    {
        const error =  new HttpError('Could not find any category', 404);
        return next(error);
    }
    const createProduct = {
        name: req.body.name,
        categoryId: req.body.categoryId,
        size: req.body.size,
        prices: req.body.prices,
        quantity: req.body.quantity,
        description: req.body.description,
    };
    try {
        const newProducts = new Product(createProduct);
        await newProducts.save();
        res.status(200).json({
        message: "Create success", newProducts
    });
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        // Duplicate username
        return res.status(422).send({ message: 'Product already exist!' });
      }
      return res.status(422).send(error);
    };
};

const updateProductbyId = async(req, res, next) => {
  const errors = validationResult(req);
  const ProId = req.params.pid;
  if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const updatedProduct = {
      name: req.body.name,
      category: req.body.category,
      size: req.body.size,
      prices: req.body.prices,
      quantity: req.body.quantity,
      description: req.body.description,
      alias: getAlias(req.body.name)
      };
    let products;
    products = await Product.findByIdAndUpdate(pid, updatedProduct);
    res.status(200).json({products: updatedProduct});

}

const deleteProductById = async (req, res, next) => {
  const ProId = req.params.pid;
  let products;
  try{
      products = await Product.findOneAndDelete(pid);
  }
  catch (err) {
      const error = new HttpError('Something went wrong, can not delete', 500);
      return next(error);
  }
  if(!products)
  {
      const error =  new HttpError('Could not find any product', 404);
      return next(error);
  }
  res.status(200).json({message: 'Deleted product:'});
}

const getAllProducts = async(req, res, next) => {
    let products;
    try {
        products = await Product.find();
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any product', 500);
        return next(error);
    }
    console.log((products));
    if(!products)
    {
      const error =  new HttpError('Could not find any product', 404);
      return next(error);
    }
  res.status(200).json({products});
}


const getProductById = async (req, res, next) => {
  const ProId = req.params.pid;
  let products;
  try {
    products = await Product.findById(ProId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a product.',500);
    return next(error);
  }

  if (!products) {
    const error = new HttpError(
      'Could not find a product for the provided id.',404);
    return next(error);
  }
  res.json({ products: products.toObject({ getters: true }) }); 
};

module.exports = {getAllProducts, getProductById, createProduct, updateProductbyId, deleteProductById};