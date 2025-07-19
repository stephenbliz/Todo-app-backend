const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
        require: false
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: false
    },
    tag: {
        type: String,
        require: true
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;