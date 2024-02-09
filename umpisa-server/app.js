const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./config/config');
require('dotenv').config();
const cors = require('cors'); // Import the cors middleware

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Routes
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// Start server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
