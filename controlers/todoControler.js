const Todo = require('../model/todoModel');
const mongoose = require('mongoose');



// Get all todo

const getAllTodo = async (req, res) => {
    const todo = await Todo.find({}).sort({createdAt: -1});
    res.status(200).json(todo);
}

// Get single todo

const getSingleTodo = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Could not find such todo'})
    }

    const todo = await Todo.findById({_id: id});

    if(!todo){
        return res.status(404).json({error: 'Could not find such todo'})
    }

    res.status(200).json(todo);
}

// Delete a todo

const deleteATodo = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Could not find such todo'})
    }

    const todo = await Todo.findByIdAndDelete(id);

    if(!todo){
        return res.status(404).json({error: 'Could not find such todo'})
    }

    res.status(200).json(todo);
}

// Post a todo

const postTodo = async (req, res) => {
    const {title, description, priority, status} = req.body;  

    if (!title || !priority || !status || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try{
        const todo = await Todo.create({
            title,
            description,
            image: req.file ? req.file.path : null,
            priority,
            status
        });
        if(todo) {
            res.status(200).json(todo);
        }
        
    }catch(err){
        res.status(404).json({error: err});
    }
}

// Update a todo

const updateATodo = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Could not find such todo in mongoose'})
    }

    const todo = await Todo.findByIdAndUpdate(id, {...req.body, image: req.file ? req.file.path : null,});

    if(!todo){
        return res.status(404).json({error: 'Could not find such todo...'})
    }

    res.status(200).json(todo);
}



module.exports = {
    getAllTodo,
    getSingleTodo,
    deleteATodo,
    postTodo,
    updateATodo
}