const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    customerName:{type: String, require: true},
    customerPhone: {type: String, required: true},
    customerAddress:{type:String, require: true},
    quantity:{type:Number, require: true},
    totalPrices:{type:Number, require: true},
    status:{type:String, require: true},
    createAt: {type: Date, require: false},
    doneAt: {type: Date, require: false},   
    productId:{type:String, required: false},
    userId:{type:String, required: false}
});


module.exports = mongoose.model('Order',ordersSchema);