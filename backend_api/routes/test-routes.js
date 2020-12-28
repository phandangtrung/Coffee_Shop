const express = require("express");

const testController = require("../controller/test-controllers");

const router = express.Router();

router.post("/", testController.createtest);

router.put("/:tid",testController.updatetestById)
module.exports = router;
