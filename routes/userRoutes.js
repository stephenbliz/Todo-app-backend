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
router.post('/', signUp);

// Get all user
router.get('/', getAllUser);

// Delete a user
router.delete('/:id', deleteUser);

// Update a user
router.put('/:id', updateUser);

// Make a user admin
router.put('/:id', makeAdmin);

// SignIn a user
router.get('/', signIn);

module.exports = router;