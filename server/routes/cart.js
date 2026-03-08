const express = require('express');
const CartItem = require('../models/cart');
const router = express.Router();
router.post('/add', async (req, res) => {
    const { userId, items, totalAmount } = req.body;
    const newCartItem = new CartItem({ userId, items, totalAmount });

    try {
        const savedCartItem = await newCartItem.save();
        res.json(savedCartItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const cartItems = await CartItem.find({ userId: req.params.userId });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/update/:id', async (req, res) => {
    try {
        const updatedCart = await CartItem.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/remove/:id', async (req, res) => {
    try {
        const removedCartItem = await CartItem.findByIdAndRemove(req.params.id);
        res.json({ message: 'Item removed', removedCartItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
