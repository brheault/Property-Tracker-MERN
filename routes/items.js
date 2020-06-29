import express from 'express';
import Item from '../models/item.js';

const router = express.Router();

// @route  => GET api/items
// @desc   => Retreives all items from the database
// @access => Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route  => POST api/items
// @desc   => Creates an item object and puts it in the database
// @access => Public
router.post('/', (req, res) => {
    const newItem = new Item({name: req.body.name});
    newItem.save()
        .then(item => res.json(item));
});

// @route  => DELETE api/items/<id>
// @desc   => Deletes and item object from the database
// @access => Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
        .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});
    

export default router;