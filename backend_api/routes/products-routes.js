const express = require('express');
const { check } = require('express-validator');

const uploadfile = require('../middleware/upload');
const productsController = require('../controller/products-controllers');

const router = express.Router();

router.get('/',productsController.getAllProducts);
router.get('/:pid',productsController.getProductById);


router.post('/',
uploadfile.single('images'),
[
    check('name').not().isEmpty()
]
,productsController.createProduct);

router.patch('/:pid',
uploadfile.single('images'),
[
    check('name').not().isEmpty()
]
,productsController.updateProductbyId);

router.delete('/:pid', productsController.deleteProductById);

module.exports = router;