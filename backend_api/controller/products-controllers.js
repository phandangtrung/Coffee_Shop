const mongoose = require("mongoose");
const { products } = require("../models/products");
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

/*------------------------Tao San Pham Moi ------------------------------*/

const createProduct = async (req, res, next) => {
  let newProducts;
  let imagesCurrent;
  let existingProduct;
  if (typeof req.file !== "undefined") {
    imagesCurrent = req.file.path;
  } else imagesCurrent = null;
  if (imagesCurrent === null) {
    const createProduct = {
      name: req.body.name,
      alias: getAlias(req.body.name),
      size_M: req.body.size_M,
      size_L: req.body.size_L,
      prices: req.body.prices,
      description: req.body.description,
      categoryId: req.body.categoryId,
    };
    console.log(createProduct);
    try {
      existingProduct = await products.findOne({ alias: createProduct.alias });
    } catch (err) {
      const error = new HttpError("Something wrong!!!", 500);
      return res.send(error);
    }
    if (!existingProduct) {
      try {
        newProducts = new products(createProduct);
        await newProducts.save();
        console.log(newProducts);
      } catch (err) {
        const error = new HttpError("Something wrong!!!", 500);
        return res.status(422).send(error);
      }
      res.status(200).json({
        message: "Create success",
        newProducts,
      });
    } else {
      console.log("Product already exist");
      res.status(422).json({ message: "Product already exist" });
    }
  } else {
    const createProduct = {
      name: req.body.name,
      alias: getAlias(req.body.name),
      size_M: req.body.size_M,
      size_L: req.body.size_L,
      prices: req.body.prices,
      description: req.body.description,
      imagesProduct: imagesCurrent,
      categoryId: req.body.categoryId,
    };
    console.log(createProduct);
    try {
      existingProduct = await products.findOne({ alias: createProduct.alias });
    } catch (err) {
      const error = new HttpError("Something wrong!!!", 500);
      return res.send(error);
    }
    if (!existingProduct) {
      try {
        newProducts = new products(createProduct);
        await newProducts.save();
        console.log(newProducts);
      } catch (err) {
        const error = new HttpError("Something wrong!!!", 500);
        return res.status(422).send(error);
      }
      res.status(200).json({
        message: "Create success",
        newProducts,
      });
    } else {
      console.log("Product already exist");
      res.status(422).json({ message: "Product already exist" });
    }
  }
};

/*------------------------Cap Nhat San Pham------------------------------*/

const updateProductbyId = async (req, res, next) => {
  const ProId = req.params.pid;
  let imagesCurrent;
  let existingProduct;
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
      description: req.body.description,
      categoryId: req.body.categoryId,
    };
    //Tìm sản phẩm theo alias (alias thay đổi theo tên)
    existingProduct = await products.findOne({ alias: updatedProduct.alias });
    //Tìm sản phẩm theo id
    productByid = await products.findById(ProId);
    console.log(existingProduct);
    //Nếu khác null và tên của sản phẩm khác với sản phẩm trong CSDL thì báo lỗi trùng tên 
    if (existingProduct !== null && existingProduct.name !== productByid.name) {
      const error = new HttpError("Duplicate name", 500);
      return next(error);
    }
    try {
      let updatedPro;
      updatedPro = await products.findByIdAndUpdate(ProId, updatedProduct);
      //console.log(updatedPro);
    } catch (err) {
      const error = new HttpError("Update fail! ", 500);
      return next(error);
    }
    return res.status(200).json({
      message: "Update Product Success!",
      updatedPro: updatedProduct,
    });
  } else {
    const updatedProduct = {
      name: req.body.name,
      alias: getAlias(req.body.name),
      size_M: req.body.size_M,
      size_L: req.body.size_L,
      prices: req.body.prices,
      description: req.body.description,
      imagesProduct: imagesCurrent,
      categoryId: req.body.categoryId,
    };
    //Tìm sản phẩm theo alias (alias thay đổi theo tên)
    existingProduct = await products.findOne({ alias: updatedProduct.alias });
    //Tìm sản phẩm theo id
    productByid = await products.findById(ProId);
    console.log(existingProduct);
    //Nếu khác null và tên của sản phẩm khác với sản phẩm trong CSDL thì báo lỗi trùng tên 
    if (existingProduct !== null && existingProduct.name !== productByid.name) {
      const error = new HttpError("Duplicate name", 500);
      return next(error);
    }
    try {
      let updatedPro;
      updatedPro = await products.findByIdAndUpdate(ProId, updatedProduct);
      //console.log(updatedPro);
    } catch (err) {
      const error = new HttpError("Update fail! ", 500);
      return next(error);
    }
    return res.status(200).json({
      message: "Update Product Success!",
      updatedPro: updatedProduct,
    });
  }
};

const deleteProductById = async (req, res, next) => {
  const ProId = req.params.pid;
  let products;
  try {
    products = await products.findByIdAndDelete(ProId);
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
  let productList;
  try {
    productList = await products.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not find any product",
      500
    );
    return next(error);
  }
  console.log(productList);
  if (!productList) {
    const error = new HttpError("Could not find any product", 404);
    return next(error);
  }
  res.status(200).json({ productList });
};

const getProductById = async (req, res, next) => {
  const ProId = req.params.pid;
  let productList;
  try {
    productList = await products.findById(ProId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a product.",
      500
    );
    return next(error);
  }

  if (!productList) {
    const error = new HttpError(
      "Could not find a product for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ productList });
};

const getProductByCateId = async (req, res, next) => {
  const CateId = req.params.cid;
  let products;
  try {
    products = await products.find({ categoryId: CateId });
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

const getProductByName = async (req, res, next) => {
  const proInfor = {
    name: req.query.name,
    alias: getAlias(req.query.name),
  };
  //const { name } = req.body;
  console.log(proInfor);
  let productInfor;
  try {
    productInfor = await products.findOne({ alias: proInfor.alias });
    console.log(productInfor);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a product.",
      500
    );
    return next(error);
  }

  if (!productInfor) {
    const error = new HttpError(
      "Không tìm thấy sản phẩm, xin vui lòng nhập lại !!! .",
      404
    );
    return next(error);
  }
  res.status(200).json({ productInfor });
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProductbyId,
  deleteProductById,
  getProductByCateId,
};
