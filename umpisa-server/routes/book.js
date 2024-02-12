// routes/book.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware'); // Import multer middleware
const { createBook, getAllBooks, updateBook, deleteBook } = require('../controllers/book');

// Route to handle book creation with file upload
router.post('/create', upload.single('image'), createBook);

// Route to get all books
router.get('/all', getAllBooks);

// Route to update a book
router.put('/:id/update', upload.single('image'), updateBook);

// Route to delete a book
router.delete('/:id/delete', deleteBook);

module.exports = router;
