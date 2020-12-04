const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    size_M:{type:Boolean, require:false},
    size_L:{type:Boolean, require:false}, 
    prices: {type: Number, require: true},
    quantity: {type: Number, require: true},
    createAt: {type: String, required: true},
    description: {type: String, require: false},
    alias: {type: String, require: false},   
    images: {type: String, require: false},
    reviews:{type:String, require: false},
    ratings:{type:Number, require: false},
    categoryId: {type: String, required: false}     
});


module.exports = mongoose.model('Product',productsSchema);