const express = require("express");
const { check } = require("express-validator");

const { fileUploadShipper } = require("../middleware/upload");
const shippersController = require("../controller/shippers-controllers");

const router = express.Router();

router.get("/", shippersController.getAllShipper);
router.get("/:sid", shippersController.getshipperById);

router.post(
  "/",
  fileUploadShipper.single("imagesShipper"),
  shippersController.createShipper
);

router.put(
  "/:sid",
  fileUploadShipper.single("imagesShipper"),
  shippersController.updateShipperById
);

router.delete("/:sid", shippersController.deleteShipperById);

module.exports = router;
