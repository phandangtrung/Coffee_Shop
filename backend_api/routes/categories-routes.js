const express = require('express');
const { check } = require('express-validator');

const categoriesController = require('../controller/categories-controllers');

const router = express.Router();

router.get('/',categoriesController.getAllCategory);
router.get('/:alias',categoriesController.getCategoryById);

router.post('/', 
[
    check('name').not().isEmpty()
]
,categoriesController.createCategory);

module.exports = router;