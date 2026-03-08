const {User} = require('../models/user');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post(`/signup`,async(req,res)=>{
    const{ name, phone, email, password}=req.body;

    try{

        const existingUser = await User.findOne({email: email });

        if(existingUser){
            res.status(400).json({msg:"USER ALREADY EXISTS!"})
        }

        const hashPassword = await bcrypt.hash(password,10);

        const result = await User.create({
            name:name,
            phone:phone,
            email:email,
            password:hashPassword
        });

        const token = jwt.sign({email:result.email, id:result._id}, process.env.
        JSON_WEB_TOKEN_SECRET_KEY);

        res.status(200).json({
            user:result,
            token:token
        })
    } catch(error){
        console.log(error);
        res.status(500).json({msg:"SOMETHING WENT WRONG"});
    }
})

router.post(`/signin`, async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Request Body:", req.body); 

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            console.log("User not found"); 
            return res.status(404).json({ msg: "User not found!" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            console.log("Invalid credentials");
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY
        );

        console.log("User authenticated:", existingUser); 
        console.log("Token generated:", token);

        res.status(200).json({
            user: existingUser,
            token: token,
            msg: 'USER AUTHENTICATED'
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Something went wrong" });
    }
});



router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User with the given ID was not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);

        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found', status: false });
        }

        res.status(200).json({ message: 'User deleted successfully', status: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/get/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments();

        if (!userCount) {
            return res.status(500).json({ success: false });
        }

        res.status(200).json({ userCount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User cannot be updated', status: false });
        }

        res.status(200).json({ message: 'User updated successfully', status: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;