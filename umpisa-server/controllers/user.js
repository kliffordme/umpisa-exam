const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT library
const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { email, userName, password, passwordConfirm, mobile, address } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt to hash the password with a salt round of 10

    // Create a new user document with the hashed password
    const newUser = new User({ email, userName, password: hashedPassword, passwordConfirm, mobile, address });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ email: newUser.email, userName: newUser.userName }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Change 'your-secret-key' to your actual secret key and set expiry time

    res.json({ success: true, message: 'User created successfully', token }); // Include token in the response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Verify the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ email: user.email, userName: user.userName }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  
      res.json({ success: true, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getAllUsersLength = async (req, res) => {
    try {
      // Find all users and get the count
      const userCount = await User.countDocuments();
      
      res.json({ success: true, count: userCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };