const mongoose = require('mongoose');
const HttpError = require('../error-handle/http-error');
const User = require('../models/users');

const brcypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {getToken} = require('../middleware/uilt');

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
        isConfirm: false,
        isLock: false,
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

const login = async(req,res,next) => {
    const {email, password} = req.body;
    console.log(email, password);
    let existingUser;

    try{
        existingUser = await User.findOne({"email":email});
        console.log(existingUser);
    } catch (err) {
        const error = new HttpError('Login failed. Pls try again', 500);
        return next(error);
    }
    
    if(!existingUser) {
        const error = new HttpError('Email or Password is invalid', 401);
        return next(error);
    }
    if(existingUser.isConfirm === false || existingUser.isLock === true ) {
        const error = new HttpError('Your account is not confirm or was locked', 401);
        return next(error);
    }

    let isValidPassword;
    try {
        isValidPassword = await brcypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError('Something is error. Pls try again', 401);
        return next(error);
    }

    if(!isValidPassword){
        const error = new HttpError('Email or Password is invalid', 401);
        return next(error);
    }

    let token;
    try {
        token = getToken(existingUser);
    } catch (err) {
        const error = new HttpError('Login failed, please try again later.',500);
        return next(error)
    }

    res.status(200).json({
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        token: token
    })

};

module.exports = {register, login};