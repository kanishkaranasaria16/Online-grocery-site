const express = require('express');
const router = express.Router();
const { ProductList } = require('../models/productlist'); 
router.get('/', async (req, res) => {
    try {
        const productList = await ProductList.find(req.query); 

        if (!productList.length) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }
        return res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const productList = await ProductList.findById(req.params.id); 
        if (!productList) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/add', async (req, res) => { 
    const newProductList = new ProductList(req.body); 
    try {
        const savedProductList = await newProductList.save();
        res.status(201).json(savedProductList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('http://localhost:3000/products/:id', async (req, res) => {
    try {
        const updatedProductList = await ProductList.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProductList) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProductList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const productList = await ProductList.findById(req.params.id);

        if (!productList) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        await ProductList.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
