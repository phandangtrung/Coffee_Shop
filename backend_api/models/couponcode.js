const mongoose = require('mongoose')

const couponCodeSchema = new mongoose.Schema({
    discount: {type: String, require: true, unique: true}
 
});


module.exports = mongoose.model('CouponCode',couponCodeSchema);