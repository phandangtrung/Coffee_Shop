const express = require('express');
const { check } = require('express-validator');

const categoriesController = require('../controller/categories-controllers');

const router = express.Router();

router.get('/',categoriesController.getAllCategory);
router.get('/:alias',categoriesController.getCategoryAlias);

router.post('/', 
[
    check('name').not().isEmpty()
]
,categoriesController.createCategory);

router.patch('/:alias',
[
    check('name').not().isEmpty()
]
,categoriesController.updateCategoryByAlias);

router.delete('/:alias', categoriesController.deleteCategoryByAlias);
module.exports = router;