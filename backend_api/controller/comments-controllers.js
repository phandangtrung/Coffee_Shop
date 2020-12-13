const mongoose = require('mongoose');
const Comment = require('../models/comments');

const { validationResult } = require('express-validator');

const HttpError = require('../error-handle/http-error');


const createComment = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const createComment = {
        email: req.body.email,
        content: req.body.content,
        productId: req.body.productId               
    };
    const newComment = new Comment(createComment);
    await newComment.save();
    res.status(200).json({
    message: "Create success", newComment})
    
};

const getAllComments = async (req, res, next) => {
    let comments;
    try{
        comments = await Comment.find();
        console.log(comments)
    } catch (err) {
        const error = new HttpError('Something went wrong, coud not find any comment', 500);
        return next(error);
    };

    if(!comments)
    {
        const error =  new HttpError('Could not find any comment', 404);
        return next(error);
    }
    res.status(200).json({comments});

};

module.exports = {createComment, getAllComments};