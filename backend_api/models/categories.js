const { text } = require('body-parser');
const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    description: {type: String, require: false},
    image: {type: String, require: false},
    alias: {type: String, require: false}
});


module.exports = mongoose.model('Category',categoriesSchema);