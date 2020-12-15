const multer = require("multer");
const { v1: uuid } = require("uuid");

const MINE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUploadProduct = multer({
  limits: 50000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload/imagesProduct");
    },
    filename: (req, file, cb) => {
      const ext = MINE_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MINE_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mimetype!");
    cb(error, isValid);
  },
});

const fileUploadShipper = multer({
  limits: 50000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload/imagesShipper");
    },
    filename: (req, file, cb) => {
      const ext = MINE_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MINE_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mimetype!");
    cb(error, isValid);
  },
});

module.exports = { fileUploadProduct, fileUploadShipper };
