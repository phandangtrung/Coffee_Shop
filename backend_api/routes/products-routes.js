const express = require('express');
const { check } = require('express-validator');

const productsController = require('../controller/products-controller');

const router = express.Router();

router.get('/',productsController.getAllProducts);
router.get('/:pid',productsController.getProductById);


router.post('/', 
[
    check('name').not().isEmpty()
]
,productsController.createProduct);

router.patch('/:pid',
[
    check('name').not().isEmpty()
]
,productsController.updateProductbyId);

router.delete('/:pid', productsController.deleteProductById);

module.exports = router;