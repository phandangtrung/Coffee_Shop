
const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password:{ type: String, require: true},
    firstName :{type: String, require: true},
    lastName: {type: String, require: true}
    //isUser: { type: String, required: true },
    //isAdmin: { type: String, default: "normal" }
});


module.exports = mongoose.model('User',usersSchema);