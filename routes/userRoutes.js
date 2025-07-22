const express = require('express');
const multer = require('multer');
const cloudinary = require('../cloudinaryConfig');
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const {
    signUp,
    getAllUser,
    deleteUser,
    updateUser,
    signIn,
    makeAdmin
} = require('../controlers/userController')

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'user_images',
        allowed_format: ['jpg', 'png', 'jpeg'],
        transformation: [{height: '500', width: '500', crop: 'limit'}]
    }

});

const upload = multer({storage});

// SignUp a user
router.post('/register', upload.single('image'), signUp);

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