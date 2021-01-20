var mongoose = require('mongoose')

var batismoSchema = new mongoose.Schema({
    _id: String,
    date: String,
    href: Number,
    mae: String,
    pai: String,
    ref: String,
    title:String
});

module.exports = mongoose.model('batismo', batismoSchema, 'batismos')