
const mongoose = require('mongoose');


const registerSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    email: {type:String, require: true},
    fullname: { type: String, required: true },
    phone:{type:Number, require:false}
});


module.exports = mongoose.model('Register',registerSchema);