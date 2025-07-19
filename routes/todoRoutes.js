const express = require('express');
const cloudinary = require('../cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const {
    getAllTodo,
    getSingleTodo,
    deleteATodo,
    postTodo,
    updateATodo

} = require('../controlers/todoControler');

const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'todo_images',
    allowed_format: ['jpg', 'png', 'jpeg'],
    transformation: [{width: '500', height: '500', crop: 'limit'}]
  }
});

const upload = multer({storage});

const router = express.Router();

// get all todo
router.get('/', getAllTodo);

// get a single todo
router.get('/:id', getSingleTodo);

// delete a todo
router.delete('/:id', deleteATodo);

// posting a todo item
router.post('/', upload.single('image'), postTodo);

//updating a todo item

router.put('/:id', upload.single('image'), updateATodo);

module.exports = router;