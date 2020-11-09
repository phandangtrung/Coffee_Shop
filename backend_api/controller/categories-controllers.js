const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../error-handle/http-error');

const Category = require('../models/categories');

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
}

const getAllCategory = async (req, res, next) => {
  let categories;
  try{
      categories = await Category.findAll();
  } catch (errors) {
      const error = new HttpError('Something went wrong, coud not find any category', 500);
      return next(error);
  }

  if(!categories)
  {
      const error =  new HttpError('Could not find any category', 404);
      return next(error);
  }
  res.status(200).json({categories});

};

const createCategory= async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const createdCategory = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        alias: getAlias(req.body.name)
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
  const alias = req.params.alias;
  let categories;
  try{
      categories = await Category.findOne({
          where: {
              alias: alias
          }
      });
  } catch (err) {
      const error = new HttpError('Something went wrong, coud not find any category', 500);
      return next(error);
  }

  if(!categories)
  {
      const error =  new HttpError('Could not find any category', 404);
      return next(error);
  }
  res.status(200).json({categories});

};

module.exports = {getAllCategory, getCategoryById, createCategory};