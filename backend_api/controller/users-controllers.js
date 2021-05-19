const mongoose = require("mongoose");
const HttpError = require("../error-handle/http-error");
const User = require("../models/users");
const Branch = require("../models/branches");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
require("dotenv/config");

const brcypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { getToken } = require("../middleware/uilt");

const client = new OAuth2Client(process.env.google_client_ID);

const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 465,
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
});

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid Input! Pls check your data", 400);
    return next(error);
  }
  const { fName, email, password } = req.body;

  let userEmail;
  try {
    userEmail = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signup Fail!. Pls try again", 500);
    return next(error);
  }
  if (userEmail) {
    const error = new HttpError(
      "Mail exists already, Pls use another mail",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await brcypt.hash(password, 9);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
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
    password: hashedPassword,
  };
  let newUsers;
  try {
    newUsers = new User(createdUser);
    await newUsers.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  let token;
  try {
    token = getToken(createdUser);
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    newUsers,
    token,
  });
  const url = `http://localhost:5000/api/users/confirmation/${token}`;
  transporter.sendMail({
    to: createdUser.email,
    subject: "Confirm Email",
    html: `Please click this email to confirm your email: <a href="${url}">Click here</a>`,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    console.log(existingUser);
  } catch (err) {
    const error = new HttpError("Login failed. Pls try again", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Email or Password is invalid", 401);
    return next(error);
  }
  if (existingUser.isConfirm === false || existingUser.isLock === true) {
    const error = new HttpError(
      "Your account is not confirm or was locked",
      401
    );
    return next(error);
  }

  let isValidPassword;
  try {
    isValidPassword = await brcypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Something is error. Pls try again", 401);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Email or Password is invalid", 401);
    return next(error);
  }

  let token;
  try {
    token = getToken(existingUser);
  } catch (err) {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }

  res.status(200).json({
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
    isEmployee: existingUser.isEmployee,
    token: token,
  });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    console.log(existingUser);
  } catch (err) {
    const error = new HttpError("Something wrong", 500);
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError("User with email does not exist", 422);
    return next(error);
  }
  let token;
  try {
    token = getToken(existingUser);
  } catch (err) {
    const error = new HttpError("Sonething wrong", 500);
    return next(error);
  }
  res.status(201).json({
    email: existingUser.email,
    token: token,
  });
  const url = `${process.env.CLIENT_URL}/api/users/forgotPass/changePass/${token}`;
  await transporter.sendMail({
    to: existingUser.email,
    subject: "Link change email",
    html: `Please click link this email to change your email: <a href="${url}">Click here</a>`,
    // html: `<p>${process.env.CLIENT_URL}/api/users/forgotPass/changePass/${token}</p>`
  });
};

const changePassword = async (req, res, next) => {
  const token = req.params.token;
  const decodedToken = jwt.verify(token, process.env.CHANGE_PASS_KEY);
  const userData = {
    email: decodedToken.email,
  };
  console.log(user.email);
  const changePass = {
    password: req.body.password,
  };
  let existingUser;
  try {
    existingUser = await User.updateOne({ email: userData.email }, changePass);
    console.log(existingUser);
  } catch (err) {
    const error = new HttpError("request time out", 500);
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError("Could not find any users", 404);
    return next(error);
  }

  res.status(200).json({
    message: "Update Successfully!",
    existingUser,
  });
  return res.redirect("http://localhost:3000/api/users/forgotPass/updatePass/");
};

const loginGoogle = async (req, res, next) => {
  const { tokenId } = req.body;
  try {
    client
      .verifyIdToken({
        idToken: tokenId,
        audience: process.env.google_client_ID,
      })
      .then(async (response) => {
        const { email_verified, name, email } = response.payload;
        if (email_verified) {
          let existingUser;
          try {
            existingUser = await User.findOne({ email: email });
          } catch (err) {
            const error = new HttpError("Login failed. Pls try again", 500);
            return next(error);
          }

          if (!existingUser) {
            let stringToHash = email + Math.floor(Math.random() * 3000);
            console.log(stringToHash);
            let hashedPassword;
            hashedPassword = await brcypt.hash(stringToHash, 9);
            const createdUser = {
              fName: name,
              email: email,
              isAdmin: false,
              isEmployee: false,
              isConfirm: true,
              isLock: false,
              password: hashedPassword,
            };
            let newUsers;
            try {
              console.log(createdUser);
              newUsers = new User(createdUser);
              await newUsers.save();
            } catch (err) {
              const error = new HttpError(
                "Signing up failed, please try again later.",
                500
              );
              return next(error);
            }
            transporter.sendMail({
              to: createdUser.email,
              subject: "Thanks for your subscription",
              //html: `Here is your password if you need to login without google: ${stringToHash}`,
            });
            let token;
            try {
              token = getToken(createdUser);
            } catch (err) {
              const error = new HttpError(
                "Signing up failed, please try again later.",
                500
              );
              return next(error);
            }
            res.status(200).json({
              email: createdUser.email,
              isAdmin: createdUser.isAdmin,
              token: token,
            });
          } else if (existingUser.isLock === true) {
            const error = new HttpError("Your account was blocked", 401);
            return next(error);
          } else {
            let token;
            try {
              token = getToken(existingUser);
            } catch (err) {
              const error = new HttpError(
                "Login failed, please try again later.",
                500
              );
              return next(error);
            }

            res.status(200).json({
              message: "login success",
              email: existingUser.email,
              isAdmin: existingUser.isAdmin,
              token: token,
            });
          }
        }
      });
  } catch (err) {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }
  // res.status(200).json({
  //   message: "login success",
  //   email: existingUser.email,
  //   token: existingUser.token,
  // });
  //return res.redirect("http://localhost:3000/");
};

const loginFacebook = async (req, res, next) => {
  const { userID, accessToken } = req.body;
  try {
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    fetch(urlGraphFacebook, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(async (response) => {
        const { email, name } = response;
        let existingUser;
        try {
          existingUser = await User.findOne({ email: email });
        } catch (err) {
          const error = new HttpError("Login failed. Pls try again", 500);
          return next(error);
        }
        if (!existingUser) {
          let stringToHash = email + Math.floor(Math.random() * 3000);
          console.log(stringToHash);
          let hashedPassword;
          hashedPassword = await brcypt.hash(stringToHash, 9);
          const createdUser = {
            fName: name,
            email: email,
            isAdmin: false,
            isEmployee: false,
            isConfirm: true,
            isLock: false,
            password: hashedPassword,
          };
          let newUsers;
          try {
            console.log(createdUser);
            newUsers = new User(createdUser);
            await newUsers.save();
          } catch (err) {
            const error = new HttpError(
              "Signing up failed, please try again later.",
              500
            );
            return next(error);
          }
          let token;
          try {
            token = getToken(createdUser);
          } catch (err) {
            const error = new HttpError(
              "Signing up failed, please try again later.",
              500
            );
            return next(error);
          }
          res.status(200).json({
            email: createdUser.email,
            isAdmin: existingUser.isAdmin,
            token: token,
          });
        } else if (existingUser.isLock === true) {
          const error = new HttpError("Your account was blocked", 401);
          return next(error);
        } else {
          let token;
          try {
            token = getToken(existingUser);
          } catch (err) {
            const error = new HttpError(
              "Login failed, please try again later.",
              500
            );
            return next(error);
          }
          res.status(200).json({
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
            token: token,
          });
        }
      });
  } catch (err) {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }
  res.status(200).json({
    message: "login success",
  });
  //return res.redirect("http://localhost:3000/");
};

const getConfirmation = async (req, res, next) => {
  const token = req.params.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userData = {
    email: decodedToken.email,
  };
  console.log(userData.email);
  const updatedUser = {
    isConfirm: true,
  };
  let users;

  try {
    users = await User.updateOne({ email: userData.email }, updatedUser);
    console.log(users);
  } catch (err) {
    const error = new HttpError("Your confirmation is out of time", 500);
    return next(error);
  }

  if (!users) {
    const error = new HttpError("Could not find any users", 404);
    return next(error);
  }

  //res.status(200).json({message: 'Verify email Success'});
  return res.redirect("http://localhost:3000/signupsuccess/");
};

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not find any user",
      500
    );
    return next(error);
  }
  console.log(users);
  if (!users) {
    const error = new HttpError("Could not find any user", 404);
    return next(error);
  }
  res.status(200).json({ users });
};

const getUserById = async (req, res, next) => {
  let users;
  const UserId = req.params.uid;
  try {
    users = await User.findById(UserId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any user.",
      500
    );
    return next(error);
  }
  if (!users) {
    const error = new HttpError(
      "Could not find any user for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ users: users.toObject({ getters: true }) });
};

const getMyUser = async (req, res, next) => {
  let users;
  try {
    users = await User.findOne({ email: req.userData.email });
    console.log(users);
  } catch (err) {
    const error = new HttpError("You are not log in. Pls login", 500);
    return next(error);
  }

  if (!users) {
    const error = new HttpError("Could not find any users", 404);
    return next(error);
  }
  res.status(200).json({ users });
};

const updateMyUser = async (req, res, next) => {
  let users;
  const userCurrent = req.userData.email;
  try {
    users = await User.findOne({ email: userCurrent });
  } catch (err) {
    const error = new HttpError("You are not log in. Pls login", 500);
    return next(error);
  }
  console.log(users);
  if (!users) {
    const error = new HttpError("Could not find any users", 404);
    return next(error);
  }

  const userInfo = {
    fName: req.body.fName,
    gender: req.body.gender,
    birthday: req.body.birthday,
    phone: req.body.phone,
    address: req.body.address,
  };

  let userUpdate;
  try {
    userUpdate = await User.findOneAndUpdate({ email: userCurrent }, userInfo);
  } catch (err) {
    console.log(err);
    const error = new HttpError("Update Fail", 500);
    return next(error);
  }

  if (!userUpdate) {
    const error = new HttpError("Could not find any users", 404);
    return next(error);
  }
  res.status(200).json({
    message: "Update Successfully!",
  });
};

const lockUser = async (req, res, next) => {
  let users;
  const Userid = req.params.uid;
  //console.log(Userid);
  const userLock = {
    isLock: true,
  };
  try {
    users = await User.findByIdAndUpdate(Userid, userLock);
    console.log(users);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not lock", 500);
    return next(error);
  }
  if (!users) {
    const error = new HttpError("Could not lock this user", 404);
    return next(error);
  }
  res.status(200).json({
    message: "lock user successful",
    users: userLock,
  });
};

const unlockUser = async (req, res, next) => {
  let users;
  const Userid = req.params.uid;
  //console.log(Userid);
  const userunLock = {
    isLock: false,
  };
  try {
    users = await User.findByIdAndUpdate(Userid, userunLock);
    console.log(users);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not lock", 500);
    return next(error);
  }
  if (!users) {
    const error = new HttpError("Could not lock this user", 404);
    return next(error);
  }
  res.status(200).json({
    message: "lock user successful",
    users: userunLock,
  });
};

const admin = async (req, res, next) => {
  const createdAdmin = {
    fName: "Admin",
    email: "Admin",
    password: "Admin@123",
    isAdmin: true,
    isConfirm: true,
    isLock: false,
  };
  let newAdmin;
  newAdmin = new User(createdAdmin);
  await newAdmin.save();
  res.status(201).json({
    createdAdmin,
  });
  let token;
  try {
    token = getToken(createdAdmin);
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    newAdmin,
    token,
  });
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  let existingAdmin;

  try {
    existingAdmin = await User.findOne({ email: email });
    console.log(existingAdmin);
  } catch (err) {
    const error = new HttpError("Login failed. Pls try again", 500);
    return next(error);
  }

  if (!existingAdmin) {
    const error = new HttpError("Email or Password is invalid", 401);
    return next(error);
  }

  if (!existingAdmin.isAdmin) {
    const error = new HttpError("Account is not admin", 401);
    return next(error);
  }

  let isValidPassword;
  try {
    isValidPassword = await brcypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Something is error. Pls try again", 401);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Email or Password is invalid", 401);
    return next(error);
  }

  let token;
  try {
    token = getToken(existingAdmin);
  } catch (err) {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }

  res.status(200).json({
    email: existingAdmin.email,
    isAdmin: existingAdmin.isAdmin,
    token: token,
  });
};

const addEmployee = async (req, res, next) => {
  const createEmployee = {
    fName: req.body.fName,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
    isEmployee: true,
    isConfirm: true,
    isLock: false,
    branchId: req.body.branchId,
  };
  let newEmployee = new User(createEmployee);
  await newEmployee.save();
  res.status(201).json({ newEmployee });
  let token;
  let hashedPassword;
  try {
    hashedPassword = await brcypt.hash(password, 9);
    token = getToken(createEmployee);
  } catch (err) {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }
  res.status(201).json({
    newEmployee,
    token,
  });
};

const loginEmployee = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  let existingEmployee;
  try {
    existingEmployee = await User.findOne({ email: email });
    console.log(existingEmployee);
  } catch (err) {
    const error = new HttpError("Login failed. Pls try again", 500);
    return next(error);
  }

  if (!existingEmployee) {
    const error = new HttpError("Email or Password is invalid", 401);
    return next(error);
  }
  if (
    existingEmployee.isConfirm === false ||
    existingEmployee.isLock === true
  ) {
    const error = new HttpError(
      "Your account is not confirm or was locked",
      401
    );
    return next(error);
  }

  let isValidPassword;
  try {
    isValidPassword = await brcypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Something is error. Pls try again", 401);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Email or Password is invalid", 401);
    return next(error);
  }

  let token;
  try {
    token = getToken(existingEmployee);
  } catch (err) {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }

  res.status(200).json({
    email: existingUser.email,
    isEmployee: existingUser.isEmployee,
    token: token,
  });
};

module.exports = {
  register,
  login,
  forgotPassword,
  changePassword,
  getConfirmation,
  lockUser,
  unlockUser,
  getMyUser,
  updateMyUser,
  getAllUsers,
  getUserById,
  admin,
  loginAdmin,
  loginEmployee,
  addEmployee,
  loginGoogle,
  loginFacebook,
};
