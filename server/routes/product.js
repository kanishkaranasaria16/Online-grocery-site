const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { Product } = require('../models/product.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

router.post('/create', upload.array('images'), async (req, res) => {
    try {
      const imageUrls = req.files.map(file => `/uploads/${file.filename}`); 

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            images: imageUrls, 
            brands: req.body.brands,
            price: req.body.price,
            Oldprice: req.body.Oldprice,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            dateCreates: req.body.dateCreates
        });

        const savedProduct = await product.save();
        if (!savedProduct) {
            return res.status(500).json({ error: 'Error saving product', success: false });
        }

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
});

router.get('/', async (req, res) => {
    try {
        const productList = await Product.find().populate("category");

        if (!productList) {
            return res.status(500).json({ success: false });
        }

        res.send(productList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'The product with the given id was not found.' });
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {
            return res.status(404).json({
                message: "Product not found",
                status: false
            });
        }
        res.status(200).send({
            message: "The product is deleted!",
            status: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({
                message: 'The product cannot be updated!',
                status: false
            });
        }

        res.status(200).json({
            message: 'The product is updated!',
            status: true,
            product: product 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
