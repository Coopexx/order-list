const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = 3000;
//outsource this into dotenv file
const uri =
    'mongodb+srv://acCELLerate:u74gQ5EpDgFM74mz2TX7@orderlist.tggdj44.mongodb.net/OrderList?retryWrites=true&w=majority';

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

async function displayAll() {
    const items = await Item.find();
    return items;
}

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

async function getItems(req, res) {
    const items = await displayAll();
    res.status(200).json(items);
}

app.get('/api/v1/items', getItems);

connect();

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
