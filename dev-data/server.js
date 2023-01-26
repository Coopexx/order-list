const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 3000;
//outsource this into dotenv file
const uri =
    'mongodb+srv://acCELLerate:u74gQ5EpDgFM74mz2TX7@orderlist.tggdj44.mongodb.net/OrderList?retryWrites=true&w=majority';

//SCHEMA
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

const Item = mongoose.model('Item', itemSchema); //must match name of collection

async function displayAll() {
    const items = await Item.find();
    return items;
}

const getItems = async (req, res) => {
    const items = await displayAll();
    res.status(200).json(items);
};

//POST ITEM
const postItem = async (req, res) => {
    try {
        //if (items.find().amount > 0){UPDATE items.find() = items.find() + req.body.amount}
        const newItem = await Item.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                item: newItem,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

//CONTROLLER
app.get('/api/v1/items', getItems);
app.post('/api/v1/items', postItem);

//SERVER
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}
connect();

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
