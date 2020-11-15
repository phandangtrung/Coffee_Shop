
const mongoose = require('mongoose');


const accountsSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password:{ type: String, require: true},
    idUser: { type: String, required: true },
    isAdmin: { type: String, default: "normal" }
});


module.exports = mongoose.model('Account',accountsSchema);