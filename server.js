import express from 'express';
import bodyParser from 'body-parser';
import User from './src/model/User';
// import User from './src/model/User';
// import User from './model/User';


const app = express();
app.use(bodyParser.json());

app.post('/user/login', async (req, res) => {
    const { userId, username } = req.body;

    if (!userId || !username) {
        return res.status(400).json({ message: 'User ID and username are required' });
    }

    try {
        // Find or create the user
        const [user, created] = await User.findOrCreate({
            where: { userId },
            defaults: { username, isOnline: true },
        });

        // If user exists, update their online status
        if (!created) {
            user.isOnline = true;
            await user.save();
        }

        res.status(200).json({ message: 'User logged in', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in user' });
    }
});

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});
