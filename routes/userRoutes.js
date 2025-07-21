const express = require('express');
const {
    signUp,
    getAllUser,
    deleteUser,
    updateUser,
    signIn,
    makeAdmin
} = require('../controlers/userController')

const router = express.Router();

// SignUp a user
router.post('/register', signUp);

// Get all user
router.get('/user', getAllUser);

// Delete a user
router.delete('/user/:id', deleteUser);

// Update a user
router.put('/user/:id', updateUser);

// Make a user admin
router.put('/user/:id', makeAdmin);

// SignIn a user
router.post('/login', signIn);

module.exports = router;