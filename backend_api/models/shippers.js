const mongoose = require('mongoose');

const shippersSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    images: {type: String, required: false},
    phone: {type: Number, require: false},
    point: {type: Number, require: false},
});


module.exports = mongoose.model('Shipper',shippersSchema);