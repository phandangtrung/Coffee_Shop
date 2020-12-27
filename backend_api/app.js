const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./error-handle/http-error");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv/config");

const categoriesRouters = require("./routes/categories-routes");
const productsRouters = require("./routes/products-routes");
const ordersRouters = require("./routes/orders-routes");
const shippersRouters = require("./routes/shippers-routes");
const usersRouters = require("./routes/users-routes");
const commentsRouters = require("./routes/comments-routes");
const couponCodeRouters = require("./routes/couponCode-routes");
const testRouters = require("./routes/test-routes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(
  "/upload/imagesProduct",
  express.static(path.join("upload", "imagesProduct"))
);
app.use(
  "/upload/imagesShipper",
  express.static(path.join("upload", "imagesShipper"))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/categories", categoriesRouters);
app.use("/api/products", productsRouters);
app.use("/api/orders", ordersRouters);
app.use("/api/shippers", shippersRouters);
app.use("/api/users", usersRouters);
app.use("/api/comments", commentsRouters);
app.use("/api/couponCode", couponCodeRouters);
app.use("/api/test",testRouters);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
    { useCreateIndex: true },
    { useFindAndModify: false }
  )
  .then(() => {
    app.listen(3000);
    console.log("Connect Success");
  })
  .catch((error) => {
    console.log(error);
  });
