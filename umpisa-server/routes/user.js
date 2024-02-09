const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/user');
const { loginUser } = require('../controllers/user');

router.post('/register', createUser);

router.post('/login', loginUser);

module.exports = router;
