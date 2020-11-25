const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    name:{type:String, require: true},
    quantity:{type:Number, require: true},
    prices:{type:Number, require: true},
    status:{type:String, require: true},
    reviews:{type:String, require: false},
    ratings:{type:Number, require: false},
    userAddress:{type:String, require: true},
    productId:{type:String, required: false}
});


module.exports = mongoose.model('Order',ordersSchema);