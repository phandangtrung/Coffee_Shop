const mongoose = require('mongoose');
const User = require('../models/users');

const brcypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const HttpError = require('../error-handle/http-error');

const register = async(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const { fName, email, password } = req.body;

    let userEmail;
    try{
    userEmail = await User.findOne({"email":email});
    } catch (err) {
        const error = new HttpError('Signup Fail!. Pls try again', 500);
        return next(error);
    }
    if(userEmail)
    {
        const error =  new HttpError('Mail exists already, Pls use another mail', 422);
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await brcypt.hash(password, 9);
    } catch(err)
    {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
          );
          return next(error);
    }
    
    const createdUser = {
        fName,
        email,
        isAdmin: false,
        password: hashedPassword
    };
    try {
        const newUsers = new User(createdUser);
        await newUsers.save();
        res.status(201).json({
            newUsers
        });
    } catch(err) {
        const error = new HttpError('Signing up failed, please try again later.',500);
        return next(error)
    } 
    
};

module.exports = {register};