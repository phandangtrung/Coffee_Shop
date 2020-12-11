const express = require('express');
const { check } = require('express-validator');

const ordersController = require('../controller/orders-controllers');
const router = express.Router();

router.get('/',ordersController.getAllOrder);
router.get('/:oid',ordersController.getOrderById);
router.get('/userid',ordersController.getOrderByUserId);

router.post('/', 
[
    check('name').not().isEmpty()
]
,ordersController.createOrder);

router.put('/:cid',
[
    check('name').not().isEmpty()
]
,ordersController.updateOrderById);

router.delete('/:oid', ordersController.deleteOrderById);

module.exports = router;