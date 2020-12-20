const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controller/users-controllers");
const { path } = require("dotenv/lib/env-options");
const { isAdmin, isAuth } = require("../middleware/uilt");

const router = express.Router();

router.post(
  "/signup",
  [
    check("fName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.register
);
router.post("/createAdmin", usersController.admin);

router.post("/login/admin", usersController.loginAdmin);
router.post("/login", usersController.login);
router.get("/confirmation/:token", usersController.getConfirmation);

router.use(isAuth);

router.get("/myUser", usersController.getMyUser);
router.put("/myUser", usersController.updateMyUser);

router.use(isAdmin);

router.get("/", usersController.getAllUsers);
router.get("/:uid", usersController.getUserById);
router.put("/lock/:uid", usersController.lockUser);
router.put("/unlock/:uid", usersController.unlockUser);

module.exports = router;
