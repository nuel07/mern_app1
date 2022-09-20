const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//@desc Register a user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Name, email and password required')
    }

    //check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genJwt(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid data');
    }
})

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    //check for user email
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genJwt(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid credentials');
    }
    res.status(200).json({message: 'Login user'});
})

//@desc Get user data
//@route GET /api/users/me
//@access Private
const getUser = asyncHandler(async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    });
})

//Generate JWT
const genJwt = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}