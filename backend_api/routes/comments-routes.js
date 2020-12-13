const express = require('express');
const { check } = require('express-validator');

const commentsController = require('../controller/comments-controllers');

const router = express.Router();

router.get('/',commentsController.getAllComments);

router.post('/',commentsController.createComment);


module.exports = router;