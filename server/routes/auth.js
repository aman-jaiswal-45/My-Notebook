const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const fetchUser = require('../middleware/fetchUser');

// ROUTE 1: Create a User using: POST "/api/auth/register". No login required
router.post('/register', registerUser);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', loginUser);

// ROUTE 3: Get logged in User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchUser, getUser);

module.exports = router;