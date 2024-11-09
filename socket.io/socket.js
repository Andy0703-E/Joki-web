const { Server } = require('socket.io');
const http = require('http');

module.exports = (req, res) => {
    const server = http.createServer((req, res) => res.status(200).send('OK'));

    const io = new Server(server);

    let userCount = 0;

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

    // Menjalankan server di Vercel
    server.listen(3000, () => {
        console.log('Serverless function running');
    });

    return res.status(200).send('Socket.io server is running');
};

