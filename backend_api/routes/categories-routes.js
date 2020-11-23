const express = require('express');
const { check } = require('express-validator');

const categoriesController = require('../controller/categories-controllers');

const router = express.Router();

router.get('/',categoriesController.getAllCategory);
router.get('/:cid',categoriesController.getCategoryById);


router.post('/', 
[
    check('name').not().isEmpty()
]
,categoriesController.createCategory);

router.patch('/:cid',
[
    check('name').not().isEmpty()
]
,categoriesController.updateCategoryById);

router.delete('/:cid', categoriesController.deleteCategoryById);
module.exports = router;