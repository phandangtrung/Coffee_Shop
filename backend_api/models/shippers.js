const mongoose = require('mongoose');

const shippersSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    phone: {type: Number, require: false},
    point: {type: Number, require: false},
    //images: {type: String, require: false}
});


module.exports = mongoose.model('Shipper',shippersSchema);