const mongoose = require('mongoose');
const Category = require('../models/categories');

const { validationResult } = require('express-validator');

const HttpError = require('../error-handle/http-error');


const getAllCategory = async (req, res, next) => {
  let categories;
  try{
      categories = await Category.find();
  } catch (err) {
      const error = new HttpError('Something went wrong, coud not find any category', 500);
      return next(error);
  };

  if(!categories)
  {
      const error =  new HttpError('Could not find any category', 404);
      return next(error);
  }
  res.status(200).json({categories});

};

const updateCategoryById = async (req, res, next) => {
    const errors = validationResult(req);
    const CateId = req.params.cid;
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const updatedCategory = {
        name: req.body.name,
      };
    let categories;
    categories = await Category.findByIdAndUpdate(CateId, updatedCategory);
    res.status(200).json({categories: updatedCategory});
};

const deleteCategoryById = async (req, res, next) => {
    const CateId = req.params.cid;
    let categories;
    try{
        categories = await Category.findByIdAndDelete(CateId);
    }
    catch (err) {
        const error = new HttpError('Something went wrong, can not delete', 500);
        return next(error);
    }
    if(!categories)
    {
        const error =  new HttpError('Could not find any Category', 404);
        return next(error);
    }
    res.status(200).json({message: 'Deleted Category:'});
}

const createCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const createdCategory = {
        name: req.body.name,               
    };
    try {
        const newCategories = new Category(createdCategory);
        await newCategories.save();
        res.status(200).json({
        message: "Create success", newCategories
    });
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        // Duplicate username
        return res.status(422).send({ message: 'Category already exist!' });
      }
      return res.status(422).send(error);
    };
    
};

const getCategoryById = async (req, res, next) => {
  const CateId = req.params.cid;
  let categories;
  try {
    categories = await Category.findById(CateId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a category.',500);
    return next(error);
  }

  if (!categories) {
    const error = new HttpError(
      'Could not find a category for the provided id.',404);
    return next(error);
  }
  res.json({ categories: categories.toObject({ getters: true }) }); 
};

module.exports = {getAllCategory, getCategoryById, createCategory, updateCategoryById, deleteCategoryById};