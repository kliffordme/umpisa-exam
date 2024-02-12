const express = require('express');
const router = express.Router();
const { createUser, loginUser, getAllUsersLength } = require('../controllers/user');

router.post('/register', createUser);

router.post('/login', loginUser);

router.get('/count', getAllUsersLength);

module.exports = router;
