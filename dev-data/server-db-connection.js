const express = require('express');
const mongoose = require('mongoose');

const app = express();

const uri =
    'mongodb+srv://acCELLerate:u74gQ5EpDgFM74mz2TX7@orderlist.tggdj44.mongodb.net/OrderList?retryWrites=true&w=majority';

async function connect() {
    try {
        const con = await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

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

const Item = mongoose.model('Item', itemSchema);

async function addItem() {
    const cellstack = new Item({
        code: 'ZG03-03',
        name: 'Cellstack (10 layers)',
        amount: '12',
    });
    console.log(cellstack);
    await cellstack.save((err) => {
        console.log(err);
    });
}

async function displayAll() {
    const items = await Item.find();
    console.log(items);
}

connect();
displayAll();

app.listen(8000, () => {
    console.log('Server started on port 8000');
});
