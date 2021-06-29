const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controller/users-controllers");
const { isAdmin, isAuth, isEmployee } = require("../middleware/uilt");

const router = express.Router();

router.post("/googlelogin", usersController.loginGoogle);
router.post("/facebooklogin", usersController.loginFacebook);

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

router.post("/login", usersController.login);
router.post("/login/admin", usersController.loginAdmin);
router.post("/login/employee/loginEmployee", usersController.loginEmployee);

router.get("/confirmation/:token", usersController.getConfirmation);

router.use(isAuth);

router.get("/myUser", usersController.getMyUser);
router.put("/updateInfor", usersController.updateMyUser);
router.put("/changePassword", usersController.changePassword);

router.use(isAdmin);

router.post("/addEmployee", usersController.addEmployee);
router.get("/", usersController.getAllUsers);
router.get("/:uid", usersController.getUserById);
router.put("/lock/:uid", usersController.lockUser);
router.put("/unlock/userUnlocked/:uid", usersController.unlockUser);

module.exports = router;
