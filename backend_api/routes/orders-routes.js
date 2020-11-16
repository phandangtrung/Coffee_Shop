const express = require('express');
const { check } = require('express-validator');

const ordersController = require('../controller/orders-controller');

router.get('/',ordersController.getAllOrder);
router.get('/:oid',ordersController.getOrderById);


router.post('/', 
[
    check('name').not().isEmpty()
]
,ordersController.createOrder);

router.patch('/:cid',
[
    check('name').not().isEmpty()
]
,ordersController.updateOrderById);

router.delete('/:oid', ordersController.deleteOrderById);

const router = express.Router();