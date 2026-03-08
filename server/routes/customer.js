const { Customer } = require('../models/customer'); 
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

router.post(`/signup`, async (req, res) => {
    const { name, phone, email, address, password } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {
            return res.status(400).json({ msg: "Customer already exists!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newCustomer = new Customer({
            name,
            phone,
            email,
            address, 
            password: hashPassword
        });

        const result = await newCustomer.save();

        const token = jwt.sign(
            { email: result.email, id: result._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY,
            { expiresIn: '1h' } 
        );

        res.status(201).json({ customer: { ...result._doc, password: undefined }, token });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

router.post(`/signin`, async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Request Body:", req.body); 

        const existingCustomer = await Customer.findOne({ email });
        if (!existingCustomer) {
            console.log("Customer not found");
            return res.status(404).json({ msg: "Customer not found!" });
        }

        const matchPassword = await bcrypt.compare(password, existingCustomer.password);
        if (!matchPassword) {
            console.log("Invalid credentials"); 
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { email: existingCustomer.email, id: existingCustomer._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY,
            { expiresIn: '1h' } 
        );

        console.log("Customer authenticated:", existingCustomer); 
        console.log("Token generated:", token); 

        res.status(200).json({
            customer: { ...existingCustomer._doc, password: undefined },
            token: token,
            msg: 'Customer authenticated'
        });
    } catch (error) {
        console.error("Error:", error); 
        res.status(500).json({ msg: "Something went wrong" });
    }
});

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();

        if (!customers.length) {
            return res.status(404).json({ success: false, message: 'No customers found' });
        }

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer with the given ID was not found.' });
        }

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found', status: false });
        }

        res.status(200).json({ message: 'Customer deleted successfully', status: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/get/count', async (req, res) => {
    try {
        const customerCount = await Customer.countDocuments();

        if (customerCount === 0) {
            return res.status(200).json({ success: true, customerCount });
        }

        res.status(200).json({ customerCount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer cannot be updated', status: false });
        }

        res.status(200).json({ message: 'Customer updated successfully', status: true, customer: updatedCustomer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.id).select('-password');
        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found.' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
    }
});

module.exports = router;
