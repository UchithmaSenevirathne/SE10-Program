const express = require('express'); 
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.mimetype.startsWith('audio/') ? 'uploads/audio/' : 'uploads/media/';
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for uploading audio files
app.post('/upload/audio', upload.single('audio'), (req, res) => {
    if (req.file) {
        io.emit('chatAudio', `/uploads/audio/${req.file.filename}`);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

// Route for uploading media files (images and videos)
app.post('/upload/media', upload.single('media'), (req, res) => {
    if (req.file) {
        io.emit('chatMedia', `/uploads/media/${req.file.filename}`);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

// Socket.io connection setup
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
