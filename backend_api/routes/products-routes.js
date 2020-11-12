const express = require('express');
const { check } = require('express-validator');

const productsController = require('../controller/products-controller');

const router = express.Router();

router.get('/',productsController.getAllProducts);
router.get('/searchById/:pid',productsController.getProductById);
router.get('/searchByAlias/:alias',productsController.getProductByAlias);


router.post('/', 
[
    check('name').not().isEmpty()
]
,productsController.createProduct);

router.patch('/updateByAlias/:alias',
[
    check('name').not().isEmpty()
]
,productsController.updateProductbyAlias);

router.delete('/deletedByAlias/:alias', productsController.deleteProductByAlias);

module.exports = router;