/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes and origins

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema with active status and lastSeen field
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false }, // Track active status
    lastSeen: { type: Date, default: null } // Store last logout timestamp
});

const User = mongoose.model('User', userSchema);

// Routes
// POST route to create a user
app.post('/chat/users', async (req, res) => {
    try {
        const { name, email, password, isActive } = req.body;

        // Check if email is already in use
        let user = await User.findOne({ email });

        if (user) {
            // If the user exists, update their details
            user.name = name || user.name;
            user.password = password || user.password;
            user.isActive = isActive !== undefined ? isActive : user.isActive;
            await user.save();
            return res.status(200).json({ message: 'User updated successfully', user });
        }

        // If user does not exist, create a new user
        const newUser = new User({
            name,
            email,
            password,
            isActive: isActive || false
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST route for user login
app.post('/chat/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password (in production, use hashed passwords)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if first login
        const isFirstLogin = user.lastSeen === null;

        // Update active status
        user.isActive = true;
        await user.save();

        res.status(200).json({ message: isFirstLogin ? 'Welcome, first login!' : 'Welcome back!', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST route for user logout
app.post('/chat/users/logout', async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update active status and set lastSeen timestamp
        user.isActive = false;
        user.lastSeen = new Date();
        await user.save();

        res.status(200).json({ message: 'User logged out successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to fetch all users
app.get('/chat/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT route to update the active status of a user
app.put('/chat/users/:userId/status', async (req, res) => {
    try {
        const { userId } = req.params;
        const { isActive, lastSeen } = req.body;  // Add lastSeen in the request body

        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's status and lastSeen
        user.isActive = isActive;
        user.lastSeen = lastSeen;  // Set the lastSeen field

        // Save the updated user
        await user.save();

        // Respond with a success message
        res.status(200).json({ message: 'User status and lastSeen updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
