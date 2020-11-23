const mongoose = require('mongoose');
const HttpError = require('../error-handle/http-error');
const User = require('../models/users');

const brcypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {getToken} = require('../middleware/uilt');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASS
    },
});

const register = async(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        const error =  new HttpError('Invalid Input! Pls check your data', 400);
        return next(error);
    }
    const { fName, email, password, gender } = req.body;

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
        gender,
        isAdmin: false,
        isConfirm: false,
        isLock: false,
        password: hashedPassword
    };
    let newUsers;
     try {
        newUsers = new User(createdUser);
        await newUsers.save();
    } catch(err) {
        const error = new HttpError('Signing up failed, please try again later.',500);
        return next(error);
    } 
    let token;
    try {
        token = getToken(createdUser); 
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later.',500);
         return next(error)
    }
    res.status(201).json({
        newUsers, token
    });
    const url = `http://localhost:3000/api/users/confirmation/${token}`;
    transporter.sendMail({
        to: createdUser.email,
        subject: 'Confirm Email',
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      });    
};

const getConfirmation = async(req, res, next) => {
    const token = req.params.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userData = {
        email: decodedToken.email
    };
    console.log(userData.email)
    const updatedUser = {
        isConfirm: true
    };
    let users;
    try{
        users = await User.updateOne({email: userData.email},updatedUser);
        console.log(users);
    } catch (err) {
        const error = new HttpError('Your confirmation is out of time', 500);
        return next(error);
    }

    if(!users)
    {
        const error =  new HttpError('Could not find any users', 404);
        return next(error);
    }
    res.status(200).json({message: 'Success'});
}

module.exports = {register, getConfirmation};