const itemModel = require('./../models/itemModel');

//GET ITEMS
async function displayAll() {
    const items = await itemModel.Item.find();
    return items;
}

exports.getItems = async (req, res) => {
    const items = await displayAll();
    res.status(200).json(items);
};

//POST ITEM
exports.postItem = async (req, res) => {
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
//DELETE ITEM
//UPDATE ITEM
