const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname)); // Mengatur file statis agar file HTML bisa diakses

let userCount = 0; // Untuk menghitung jumlah pengguna yang terhubung

io.on('connection', (socket) => {
    console.log('User connected');
    userCount++;

    // Menetapkan User ID (User 1, User 2, dst)
    const userId = `User ${userCount}`;
    
    socket.on('chatMessage', (msg) => {
        // Menambahkan prefix user ID sebelum pesan
        const messageWithUser = `${userId}: ${msg}`;
        io.emit('chatMessage', messageWithUser); // Mengirim pesan ke semua klien
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        userCount--; // Kurangi jumlah pengguna saat ada yang terputus
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
