const mongoose = require('mongoose');

//Item
const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

exports.Item = mongoose.model('Item', itemSchema);
