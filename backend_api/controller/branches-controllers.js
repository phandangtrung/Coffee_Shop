const Branch = require("../models/branches");

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

const createBranches = async (req, res, next) => {
  const createBranches = {
    name: req.body.name,
    alias: getAlias(req.body.name),
    location: req.body.location,
    listProduct: req.body.listProduct,
  };
  try {
    const newbranch = new Branch(createBranches);
    await newbranch.save();
    console.log(newbranch);
    res.status(200).json({
      newbranch,
    });
  } catch (error) {
    return res.status(422).send(error);
  }
};

const updateBranchesById = async (req, res, next) => {
  const BrId = req.params.bid;
  const updateBranches = {
    name: req.body.name,
    alias: getAlias(req.body.name),
    location: req.body.location,
    listProduct: req.body.listProduct,
    status: req.body.status,
  };
  try {
    let branches;
    branches = await Branch.findByIdAndUpdate(BrId, updateBranches);
    console.log(branches);
    return res.status(200).json({
      message: "Update success",
      branches : updateBranches,
    });
  } catch (error) {
    return res.status(422).send(error);
  }
};

const getAllBranches = async (req, res, next) => {
  let branches;
  try {
    branches = await Branch.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not find any things",
      500
    );
    return next(error);
  }
  console.log(branches);
  if (!branches) {
    const error = new HttpError("Could not find any branch", 404);
    return next(error);
  }
  res.status(200).json({ branches });
};

const getBranchById = async (req, res, next) => {
  const BrId = req.params.bid;
  let branches;
  try {
    branches = await Branch.findById(BrId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a branch.",
      500
    );
    return next(error);
  }
  if (!branches) {
    const error = new HttpError(
      "Could not find a branch for the provided id.",
      404
    );
    return next(error);
  }
  res.status(200).json({ branches });
};

module.exports = {
  createBranches,
  updateBranchesById,
  getAllBranches,
  getBranchById,
};
