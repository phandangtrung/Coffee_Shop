const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../error-handle/http-error');

const Category = require("../models/categories");


const createCategory= async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }

    const createdCategory = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        alias: req.body.alias
    };
    try {
        const newCategories = new Category(createdCategory);
        await newCategories.save();
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        // Duplicate username
        return res.status(422).send({ message: 'Category already exist!' });
      }
      return res.status(422).send(error);
    }
    
    res.status(200).json({
      message: "Create success",
      newCategories
    });
}

module.exports = {createCategory};