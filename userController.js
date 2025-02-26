const express = require('express');
const { getUser, registerUser, loginUser } = require('../controllers/userController'); // ✅ Ensure these functions exist
const { verifyToken } = require('../middleware/authMiddleware'); // ✅ Ensure this middleware exists

const router = express.Router();

// Define routes
router.get('/profile', verifyToken, getUser); 
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
