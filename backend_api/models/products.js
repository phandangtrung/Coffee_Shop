const { text } = require('body-parser');
const { checkSchema } = require('express-validator');
const mongoose = require('mongoose');


const productsSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    size:{type:String, require:true},    
    prices: {type: Number, require: true},
    quantity: {type: Number, require: true},
    description: {type: String, require: false},   
    categoryId: {type: String, required:true}
    //images: {type: String, require: false}
});


module.exports = mongoose.model('Product',productsSchema);