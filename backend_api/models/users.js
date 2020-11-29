
const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    fName: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    gender: {type: String, require: false},
    birthday: {type: Number, require: false},
    phone: {type:Number, require: false},
    address: {type: String, require: false},
    avatar: {type: String, require: false},   
    isAdmin: { type: Boolean, required: true, default: false },
    isConfirm: {type: Boolean, require: true, default: false },
    isLock: {type: Boolean, require: true, default: false },
    createAt: {type: String, require: false}
});


module.exports = mongoose.model('User',usersSchema);