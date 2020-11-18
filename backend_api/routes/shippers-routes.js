const express = require('express');
const { check } = require('express-validator');

const shippersController = require('../controller/shippers-controller');

const router = express.Router();

router.get('/',shippersController.getAllShipper);
router.get('/:pid',shippersController.getshipperById);


router.post('/', 
[
    check('name').not().isEmpty()
]
,shippersController.createShipper);

router.patch('/:pid',
[
    check('name').not().isEmpty()
]
,shippersController.updateShipperById);

router.delete('/:pid', shippersController.deleteShipperById);

module.exports = router;