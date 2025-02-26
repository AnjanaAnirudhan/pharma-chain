require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/user');
const { enrollAdmin, registerUser } = require('./fabricService'); // Hyperledger Fabric functions
const connectDB = require('./config/dbConfig'); // Ensure this is correctly imported
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

// Import routes
const userRoutes = require('./routes/userRoutes');  // Import user routes
const drugRoutes = require('./routes/drugRoutes');  // Import drug routes

// Use the routes
app.use('/api/users', userRoutes);    // User related routes
app.use('/api/drugs', drugRoutes);    // Drug related routes

const users = {}; // In-memory storage (Replace with a database)

// Register User
app.post('/register', async (req, res) => {
    const { userID, name, email, role, password } = req.body;

    if (users[email]) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(userID, name, email, role);
    users[email] = { ...user, password: hashedPassword };

    try {
        // Register user in Hyperledger Fabric
        await registerUser(userID, role);
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error registering user in Fabric", error: error.message });
    }
});

// Login User
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users[email];

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userID: user.userID, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Server Listening on Port 3000
app.listen(3000, () => console.log("Server running on port 3000"));
