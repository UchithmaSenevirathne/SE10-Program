const socket = io();
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('m');
const fileInput = document.getElementById('fileInput');
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const emojiButton = document.getElementById('emojiButton');
const emojiPicker = document.getElementById('emojiPicker');

let mediaRecorder;
let audioChunks = [];

// Handle text messages
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chatMessage', input.value);
        input.value = '';
    }
});

// Handle file uploads (images and videos)
fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('media', file);
        
        // Post media data to the server
        await fetch('/upload/media', {
            method: 'POST',
            body: formData,
        });

        // Create media element to display the uploaded media
        const item = document.createElement('li');
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.width = 200; // Set image width
            item.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.controls = true;
            video.src = URL.createObjectURL(file);
            item.appendChild(video);
        }
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
        fileInput.value = ''; // Clear input
    }
});

// Handle emoji button
emojiButton.addEventListener('click', () => {
    emojiPicker.classList.toggle('hidden');
});

// Add emoji to input field
emojiPicker.addEventListener('click', (e) => {
    if (e.target.classList.contains('emoji')) {
        input.value += e.target.dataset.emoji; // Add emoji to input
        emojiPicker.classList.add('hidden'); // Hide emoji picker
    }
});

// Display received chat messages
socket.on('chatMessage', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// Handle audio recording
recordButton.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;

    mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Send audio to the server
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');

        // Post audio data to the server
        await fetch('/upload/audio', {
            method: 'POST',
            body: formData,
        });

        // Clear audioChunks for the next recording
        audioChunks = [];

        // Create audio element to play the recorded audio
        const item = document.createElement('li');
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = audioUrl; // URL to the recorded audio
        item.appendChild(audioElement);
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    };
});

// Stop recording
stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
});
