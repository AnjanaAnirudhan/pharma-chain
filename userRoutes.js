const express = require('express');
const { getUser, registerUser, loginUser } = require('../controllers/userController'); // ✅ Ensure all functions are imported
const { verifyToken } = require('../middleware/authMiddleware'); // ✅ Ensure middleware is imported

const router = express.Router();

// Define routes
router.get('/profile', verifyToken, getUser); // ✅ GET request works

router.post('/register', registerUser); // ✅ Check if registerUser is properly imported
router.post('/login', loginUser); // ✅ Check if loginUser is properly imported

module.exports = router;
