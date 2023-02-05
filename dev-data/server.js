//IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//SETUP
const app = express();
dotenv.config({ path: __dirname + '/./../config.env' });
app.use(express.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);

//VARIABLES
const port = 3000;
const uri = process.env.DATABASE;

//SCHEMA
const itemSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
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
    history: {
        type: Number,
    },
});
const Item = mongoose.model('Item', itemSchema); //must match name of collection

//GET ITEM
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

//PATCH ITEM
const patchItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.body._id, {
            amount: req.body.amount,
        });

        res.status(201).json({
            status: 'success',
            item: updatedItem,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
            data: req.body,
        });
    }
};

//DELETE ITEM
const deleteItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.body._id, {
            amount: 0,
        });

        res.status(201).json({
            status: 'success',
            item: updatedItem,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
            data: req.body,
        });
    }
};

//CONTROLLER
app.get('/api/v1/items', getItems);
app.post('/api/v1/items', postItem);
app.patch('/api/v1/items', patchItem);
app.delete('/api/v1/items', deleteItem);

//DATABASE
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}
connect();

//SERVER
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
