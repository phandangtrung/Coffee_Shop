const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    alias: {type: String, require: false},
    size:{type:String, require:true},    
    prices: {type: Number, require: true},
    quantity: {type: Number, require: true},
    description: {type: String, require: false},   
    images: {type: String, require: false}
});


module.exports = mongoose.model('Product',productsSchema);