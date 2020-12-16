const mongoose = require("mongoose");
const Comment = require("../models/comments");
const Product = require("../models/products");

const { validationResult } = require("express-validator");

const HttpError = require("../error-handle/http-error");

const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid Input! Pls check your data", 400);
    return next(error);
  }
  const createComment = {
    email: req.body.email,
    content: req.body.content,
    rating: req.body.rating,
    productId: req.body.productId,
  };
  const newComment = new Comment(createComment);
  await newComment.save();
  res.status(200).json({
    message: "Create success",
    newComment,
  });
};

const getAllComments = async (req, res, next) => {
  let comments;
  try {
    comments = await Comment.find();
    console.log(comments);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not find any comment",
      500
    );
    return next(error);
  }

  if (!comments) {
    const error = new HttpError("Could not find any comment", 404);
    return next(error);
  }
  res.status(200).json({ comments });
};

const getCommentByProductId = async (req, res, next) => {
  const ProId = req.params.pid;
  let comments = [];
  try {
    comments = await Comment.find({ productId: ProId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find comment of product.",
      500
    );
    return next(error);
  }

  if (!comments) {
    const error = new HttpError(
      "Could not find a product for the provided id.",
      404
    );
    return next(error);
  }
  res.status(200).json({ comments });
};

const deleteCommentById = async (req, res, next) => {
  const commentId = req.params.cid;
  let comments;
  try {
    comments = await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not delete", 500);
    return next(error);
  }
  if (!comments) {
    const error = new HttpError("Could not find comment", 404);
    return next(error);
  }
  res.status(200).json({ message: "Deleted Comment Successfull" });
};

module.exports = {
  createComment,
  getCommentByProductId,
  getAllComments,
  deleteCommentById,
};
