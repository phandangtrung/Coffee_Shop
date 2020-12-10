const express = require('express');
const { check } = require('express-validator');

const uploadfile = require('../middleware/upload');
const shippersController = require('../controller/shippers-controllers');

const router = express.Router();

router.get('/',shippersController.getAllShipper);
router.get('/:pid',shippersController.getshipperById);


router.post('/',
uploadfile.single('images'), 
[
    check('name').not().isEmpty()
]
,shippersController.createShipper);

router.patch('/:pid',
uploadfile.single('images'),
[
    check('name').not().isEmpty()
]
,shippersController.updateShipperById);

router.delete('/:pid', shippersController.deleteShipperById);

module.exports = router;