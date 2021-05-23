const mongoose = require("mongoose");
const Category = require("../models/categories");
const { products } = require("../models/products");

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

const createCategory = async (req, res, next) => {
  let newCategories;
  const createCategories = {
    name: req.body.name,
    alias: getAlias(req.body.name),
  };
  console.log(createCategories);
  let existingCategory;
  try {
    existingCategory = await Category.findOne({
      alias: createCategories.alias,
    });
  } catch (err) {
    const error = new HttpError("Something wrong!!!", 500);
    return res.send(error);
  }
  if (!existingCategory) {
    try {
      newCategories = new Category(createCategories);
      await newCategories.save();
      console.log(newCategories);
    } catch (err) {
      const error = new HttpError("Something wrong!!!", 500);
      return res.send(error);
    }
    res.status(200).json({
      message: "Create success",
      newCategories,
    });
  }
  res.status(422).json({ message: "Category already exist" });
};

const updateCategoryById = async (req, res, next) => {
  const CateId = req.params.cid;
  let categories;
  let existingCategory;
  const updateCategory = {
    name: req.body.name,
    alias: getAlias(req.body.name),
  };
  console.log(updateCategory);
  try {
    existingCategory = await Category.findOne({ alias: updateCategory.alias });
  } catch (err) {
    const error = new HttpError("Something Wrong!!!", 500);
    return next(error);
  }
  if (!existingCategory) {
    try {
      categories = await Category.findByIdAndUpdate(CateId, updateCategory);
    } catch (error) {
      return res.status(422).send(error);
    }
    res.status(200).json({
      message: "update success",
      categories: updateCategory,
    });
  }
  res.status(422).json({ message: "Category already exist!" });
};

const deleteCategoryById = async (req, res, next) => {
  const CateId = req.params.cid;
  let categories;
  try {
    categories = await Category.findByIdAndDelete(CateId);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not delete", 500);
    return next(error);
  }
  if (!categories) {
    const error = new HttpError("Could not find any Category", 404);
    return next(error);
  }
  res.status(200).json({ message: "Deleted Category successfull" });
};

const getAllCategory = async (req, res, next) => {
  let categories;
  try {
    categories = await Category.find();
    console.log(categories);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not find any category",
      500
    );
    return next(error);
  }

  if (!categories) {
    const error = new HttpError("Could not find any category", 404);
    return next(error);
  }
  res.status(200).json({ categories });
};

const getCategoryById = async (req, res, next) => {
  const CateId = req.params.cid;
  let categories;
  try {
    categories = await Category.findById(CateId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a category.",
      500
    );
    return next(error);
  }

  if (!categories) {
    const error = new HttpError(
      "Could not find a category for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ categories: categories.toObject({ getters: true }) });
};

const deleteProductByCateId = async (req, res, next) => {
  const CateId = req.params.cid;
  let categories;
  try {
    categories = await products.remove({ categoryId: CateId });
    await Category.findByIdAndDelete(CateId);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not delete", 500);
    return next(error);
  }
  if (!categories) {
    const error = new HttpError("Could not find any Category", 404);
    return next(error);
  }
  res.status(200).json({ message: "Deleted Category successfull" });
};

module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  deleteProductByCateId,
};
