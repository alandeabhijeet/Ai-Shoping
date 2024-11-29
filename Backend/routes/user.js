let express = require("express");
let router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let User = require("../models/user.js")
let JWT_SECRET = "secret_key"
router.route("/signup")
    .post(async (req, res) => {
        let { user } = req.body;
        console.log("hello get data")
        console.log(user)
        let newUser = new User(user);
        await newUser.save();
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' } 
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    });

module.exports = router; 
