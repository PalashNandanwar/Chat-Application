// /* eslint-disable no-undef */
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import cors middleware
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all routes and origins

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // User Schema with active status and lastSeen field
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     isActive: { type: Boolean, default: false }, // Track active status
//     lastSeen: { type: Date, default: null } // Store last logout timestamp
// });

// const conversationSchema = new mongoose.Schema({
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
//     receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
//     message: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now } // Timestamp for the message
// });

// const User = mongoose.model('User', userSchema);
// const Conversation = mongoose.model('Conversation', conversationSchema);

// // Routes
// // POST route to create a user
// app.post('/chat/users', async (req, res) => {
//     try {
//         const { name, email, password, isActive } = req.body;

//         // Check if email is already in use
//         let user = await User.findOne({ email });

//         if (user) {
//             // If the user exists, update their details
//             user.name = name || user.name;
//             user.password = password || user.password;
//             user.isActive = isActive !== undefined ? isActive : user.isActive;
//             await user.save();
//             return res.status(200).json({ message: 'User updated successfully', user });
//         }

//         // If user does not exist, create a new user
//         const newUser = new User({
//             name,
//             email,
//             password,
//             isActive: isActive || false
//         });

//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // POST route for user login
// app.post('/chat/users/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Verify password (in production, use hashed passwords)
//         if (user.password !== password) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         // Check if first login
//         const isFirstLogin = user.lastSeen === null;

//         // Update active status
//         user.isActive = true;
//         await user.save();

//         res.status(200).json({ message: isFirstLogin ? 'Welcome, first login!' : 'Welcome back!', user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // POST route for user logout
// app.post('/chat/users/logout', async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Update active status and set lastSeen timestamp
//         user.isActive = false;
//         user.lastSeen = new Date();
//         await user.save();

//         res.status(200).json({ message: 'User logged out successfully', user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // GET route to fetch all users
// app.get('/chat/users', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // PUT route to update the active status of a user
// app.put('/chat/users/:userId/status', async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { isActive, lastSeen } = req.body;  // Add lastSeen in the request body

//         // Find the user in the database
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Update the user's status and lastSeen
//         user.isActive = isActive;
//         user.lastSeen = lastSeen;  // Set the lastSeen field

//         // Save the updated user
//         await user.save();

//         // Respond with a success message
//         res.status(200).json({ message: 'User status and lastSeen updated successfully', user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // POST route to create a new conversation
// app.post('/chat/conversations', async (req, res) => {
//     try {
//         const { sender, receiver, message, timestamp } = req.body;

//         // Validate required fields
//         if (!sender || !receiver || !message) {
//             return res.status(400).json({ error: 'Sender, receiver, and message are required' });
//         }

//         // Check if both users are active
//         const senderUser = await User.findById(sender);
//         const receiverUser = await User.findById(receiver);

//         if (!senderUser || !receiverUser) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         if (!senderUser.isActive || !receiverUser.isActive) {
//             return res.status(400).json({ error: 'Both users must be active to send messages' });
//         }

//         // Create a new conversation entry
//         const newConversation = new Conversation({ sender, receiver, message, timestamp });

//         // Save the conversation in the database
//         await newConversation.save();

//         res.status(201).json({ message: 'Conversation stored successfully', conversation: newConversation });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // GET route to fetch conversations between two users
// app.get('/chat/conversations', async (req, res) => {
//     try {
//         const { user1, user2 } = req.query;

//         // Validate required fields
//         if (!user1 || !user2) {
//             return res.status(400).json({ error: 'Both user1 and user2 are required' });
//         }

//         // Fetch conversations where either user is the sender or receiver
//         const conversations = await Conversation.find({
//             $or: [
//                 { sender: user1, receiver: user2 },
//                 { sender: user2, receiver: user1 }
//             ]
//         })
//             .sort({ timestamp: 1 }) // Sort by timestamp (earliest first)
//             .populate('sender', 'name email') // Populate sender details
//             .populate('receiver', 'name email'); // Populate receiver details

//         res.status(200).json({ conversations });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


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

const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);
const Group = mongoose.model('Group', groupSchema);

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

// Get all groups
app.get('/grp', async (req, res) => {
    try {
        const groups = await Group.find(); // Fetch groups
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
