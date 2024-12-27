const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let activeUsers = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('userLoggedIn', (user) => {
        activeUsers.push(user);
        io.emit('activeUsers', activeUsers);
    });

    socket.on('userLoggedOut', (user) => {
        activeUsers = activeUsers.filter((u) => u.id !== user.id);
        io.emit('activeUsers', activeUsers);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        activeUsers = activeUsers.filter((u) => u.id !== socket.id);
        io.emit('activeUsers', activeUsers);
    });
});

server.listen(4000, () => {
    console.log('Server running on port 4000');
});
