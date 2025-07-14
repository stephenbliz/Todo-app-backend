const express = require('express');
const {
    getAllTodo,
    getSingleTodo,
    deleteATodo,
    postTodo,
    updateATodo

} = require('../controlers/todoControler')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
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