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
    isActive: { type: Boolean, default: false },
    lastSeen: { type: Date, default: null }
});
// Message Schema
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

// Group Schema
const groupSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Group name
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Member references
});

// Group Message Schema 
const GroupmessageSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }, // Reference to the Group
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who sent the message
    content: { type: String, required: true }, // The message content
    timestamp: { type: Date, default: Date.now }, // Timestamp for when the message was sent
    attachments: [{ type: String }] // Array of attachment URLs (optional)
});


const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);
const Group = mongoose.model('Group', groupSchema);
const Group_Message = mongoose.model('Group_Message', GroupmessageSchema);

// Routes
// POST route to create a user
app.post('/chat/users', async (req, res) => {
    try {
        const { name, email, password, isActive } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            user.name = name || user.name;
            user.password = password || user.password;
            user.isActive = isActive !== undefined ? isActive : user.isActive;
            await user.save();
            return res.status(200).json({ message: 'User updated successfully', user });
        }

        const newUser = new User({ name, email, password, isActive: isActive || false });
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
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });

        const isFirstLogin = user.lastSeen === null;
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
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

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

// Message Routes
app.post('/chat/messages', async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;
        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ error: 'Sender, receiver, and message are required' });
        }

        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/chat/messages', async (req, res) => {
    try {
        const { senderId, receiverId } = req.query;
        if (!senderId || !receiverId) {
            return res.status(400).json({ error: 'SenderId and receiverId are required' });
        }

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST route to create a group
app.post('/chat/createGroup', async (req, res) => {
    try {
        const { groupName, memberIds } = req.body;

        // Validate input
        if (!groupName || !Array.isArray(memberIds)) {
            return res.status(400).json({ error: "Invalid input" });
        }

        // Check if provided member IDs exist in the database
        const members = await User.find({ _id: { $in: memberIds } });
        if (members.length !== memberIds.length) {
            return res.status(400).json({ error: "One or more member IDs are invalid." });
        }

        // Create a new group
        const newGroup = new Group({
            name: groupName,
            members: memberIds
        });

        // Save group to database
        await newGroup.save();

        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Fetch Groups by User ID
app.get('/chat/groups/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const groups = await Group.find({ members: userId }).populate('members', 'name email');
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get all groups
app.get('/grp', async (req, res) => {
    try {
        const groups = await Group.find(); // Fetch groups
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Send Messages to the Group 
app.post('/chat/groups/:groupId/messages', async (req, res) => {
    try {
        const { groupId } = req.params;
        const { senderId, content, attachments } = req.body;

        // Validate inputs
        if (!senderId || !content) {
            return res.status(400).json({ error: "Invalid input" });
        }

        // Verify group exists
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Create and save the message
        const message = new Group_Message({
            groupId,
            senderId,
            content,
            attachments
        });

        await message.save();

        res.status(201).json({ message: "Message sent", data: message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get the Group Messages
app.get('/chat/groups/:groupId/messages', async (req, res) => {
    try {
        const { groupId } = req.params;

        // Fetch messages for the group
        const messages = await Group_Message.find({ groupId })
            .populate('senderId', 'name email') // Populate sender details
            .sort({ timestamp: 1 }); // Sort messages by timestamp (oldest first)

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
