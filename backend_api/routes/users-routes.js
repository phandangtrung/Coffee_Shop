const express = require('express');
const { check } = require('express-validator');

const uploadfile = require('../middleware/upload');
const usersController = require('../controller/users-controllers');

const router = express.Router();

router.post('/',
[
    check('fName').not().isEmpty()
]
,usersController.register);

module.exports = router;