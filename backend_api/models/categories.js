const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
});


module.exports = mongoose.model('Category',categoriesSchema);