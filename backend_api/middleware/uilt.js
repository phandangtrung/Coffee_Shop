const jwt = require("jsonwebtoken");
const HttpError = require("../error-handle/http-error");

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      fName: user.fName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

const isAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    // console.log(token);
    if (!token) {
      const error = new HttpError("invalid token", 401);
      return next(error);
    }
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    req.userData = {
      fName: decodedToken.fName,
      email: decodedToken.email,
      isAdmin: decodedToken.isAdmin,
    };
    console.log(req.userData);
    next();
  } catch (err) {
    const error = new HttpError("Token is failed to create", 403);
    return next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (req.userData && req.userData.isAdmin) {
    return next();
  }
  const error = new HttpError("Token is not admin", 401);
  return next(error);
};

module.exports = { isAuth, isAdmin, getToken };
