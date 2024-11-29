const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let User = require("../models/user.js")
let JWT_SECRET = "secret_key"

module.exports.signup = async (req, res) => {
    let { user } = req.body;
    console.log("hello get data")
    console.log(user)
    let newUser = new User(user);
    await newUser.save();
    const token = jwt.sign(
        { id: user._id, name : user.name , email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' } 
    );

    res.cookie("auth_token" , token , {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        message: 'User registered successfully',
        token,
    });
}

module.exports.login = async (req,res)=>{
    console.log("Login ")
    let {name , password} = req.body.user;
    console.log(name)
    let user = await User.findOne({name : name});
    console.log(user)
    if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ error: 'Invalid Username or password' });
    }

    const token = jwt.sign(
        { id: user._id, name : user.name , email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' } 
    );

    res.cookie("auth_token" , token , {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("sending")
    res.json({ message: 'Login successful', token });

}