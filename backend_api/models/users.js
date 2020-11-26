
const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    fName: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    gender: {type: String, require: true},
    birthday: {type: Number, require: false},
    avatar: {type: String, require: false},   
    isAdmin: { type: Boolean, required: true, default: false },
    isConfirm: {type: Boolean, require: true, default: false },
    isLock: {type: Boolean, require: true, default: false },
    createAt: {type: String, require: false}
});


module.exports = mongoose.model('User',usersSchema);