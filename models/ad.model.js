const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    localization: { type: String, required: true },
    user: { type: String, require: true, ref: 'User' },
})

module.exports = mongoose.model('ad', adSchema);