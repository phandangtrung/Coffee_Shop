const express = require('express');
const { check } = require('express-validator');

const uploadfile = require('../middleware/upload');
const usersController = require('../controller/users-controllers');
const { path } = require('dotenv/lib/env-options');
const {isAdmin, isAuth} = require('../middleware/uilt');
const { Router } = require('express');

const router = express.Router();

router.post('/signup',
[
    check('fName').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:6})
]
,usersController.register);
router.post('/createAdmin',usersController.admin);

router.post('/login/admin',usersController.loginAdmin);
router.post('/login', usersController.login);
router.get('/confirmation/:token',usersController.getConfirmation);

router.use(isAuth);

router.get('/myUser',usersController.getMyUser);
router.patch('/myUser',usersController.updateMyUser);

router.use(isAdmin);

router.get('/',usersController.getAllUsers);
router.get('/:uid', usersController.getUserById)
router.patch('/lock/:uid',usersController.lockUser);

module.exports = router;