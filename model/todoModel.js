const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    priority: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: false
    },
    status: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
}, {timestamps: true})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;