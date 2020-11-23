const express = require('express');
const { check } = require('express-validator');

const uploadfile = require('../middleware/upload');
const usersController = require('../controller/users-controllers');
const { path } = require('dotenv/lib/env-options');
const { route } = require('./categories-routes');

const router = express.Router();

router.post('/',
[
    check('fName').not().isEmpty()
]
,usersController.register);

router.get('/confirmation/:token',usersController.getConfirmation);

module.exports = router;