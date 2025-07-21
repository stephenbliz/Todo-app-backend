const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

// Add a user/SignUp
const signUp = async(req, res) => {
    const {
        firstName,
        middleName,
        surname,
        email,
        password,
        phone,
        tag
    } = req.body;

    const image = req.file? req.file.path : null;

    const user = await User.create({
        firstName,
        surname,
        middleName: middleName? middleName : null,
        password,
        phone,
        image,
        tag,
        email
    });

    if(!user){
        return res.status(404).json({error: 'Could not add user'});
    }

    res.status(200).json({message: "User signup sucessful"});
}

// Get all users
const getAllUser = async (req, res) => {
    const user = await user.find({}).sort({createdAt: -1});

    if(!user){
        return res.status(400).json({error: 'Could not fetch users'});
    }

    res.status(200).json(user);
}

// Delete a user
const deleteUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Could not find user'});
    }

    const user = await User.findByIdAndDelete(id);

    if(!user){
        return res.status(400).json({error: 'Could not find user'});
    }

    res.status(200).json(user);
}

// Update user
const updateUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Could not find user'});
    }

    const image = req.file? req.file.path : null;

    const user = await User.findByIdAndUpdate(id, {...req.body, image});

    if(!user){
        return res.status(400).json({error: 'Could not find user'});
    }

    res.status(200).json(user);
}

// Make admin
const makeAdmin = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Could not find user'});
    }

    const user = await User.findByIdAndUpdate(id, {...req.body, tag: req.body.tag});
    
    if(!user){
        return res.status(404).json({error: 'Could not find user'});
    }

    res.status(200).json(user);
}

// Get a user/SignIn
const signIn = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(!user){
        return res.status(404).json({error: 'Invalid email or password'});
    }

    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'})

    if(user.password !== password){
        res.status(404).json({error: 'Invalid email or password'});
    }else{
        res.status(200).json({
            token,
            user: {
                email: user.email,
                image: user.image? user.image : null,
                id: user._id,
                tag: user.tag,
                firstName: user.firstName,
                middleName: user.middleName? user.middleName : null,
                surname: user.surname
            }
        });
    }

}

module.exports = {
    signUp,
    getAllUser,
    deleteUser,
    updateUser,
    makeAdmin,
    signIn
}