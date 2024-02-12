// controllers/book.js

const Book = require('../models/book');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, rating } = req.body;
    const image = req.file; // Assuming you're using multer for file upload

    // Check if the required fields are present
    if (!title || !author || !rating || !image) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Create a new book document
    const newBook = new Book({ title, author, rating, image: image.path });
    await newBook.save();

    res.json({ success: true, message: 'Book created successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    // Fetch all books from the database
    const books = await Book.find();

    // If no books are found, return an empty array
    if (!books || books.length === 0) {
      return res.json({ success: true, message: 'No books found', books: [] });
    }

    // If books are found, return them in the response
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, rating } = req.body;
    const image = req.file; // Assuming you're using multer for file upload

    // Find the book by ID
    const book = await Book.findById(id);

    // If the book is not found, return an error
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Update book details
    book.title = title || book.title;
    book.author = author || book.author;
    book.rating = rating || book.rating;
    book.image = image ? image.path : book.image;

    // Save the updated book
    await book.save();

    res.json({ success: true, message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book by ID and delete it
    const deletedBook = await Book.findByIdAndDelete(id);

    // If the book is not found, return an error
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ success: true, message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
