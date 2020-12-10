const express = require('express');
const { check } = require('express-validator');

const {fileUploadProduct} = require('../middleware/upload');
const productsController = require('../controller/products-controllers');

const router = express.Router();

router.get('/',productsController.getAllProducts);
router.get('/:pid',productsController.getProductById);


router.post('/',
fileUploadProduct.single('imagesProduct'),
[
    check('name').not().isEmpty()
]
,productsController.createProduct);

router.patch('/:pid',
fileUploadProduct.single('imagesProduct'),
[
    check('name').not().isEmpty()
]
,productsController.updateProductbyId);

router.delete('/:pid', productsController.deleteProductById);

module.exports = router;