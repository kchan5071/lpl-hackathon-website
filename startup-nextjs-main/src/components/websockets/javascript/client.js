const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:8079');

const myList = [1, 2, 3, 4, 5];

const jsonString = JSON.stringify(myList);

// Listen for the connection event
socket.addEventListener('open', (event) => {
    console.log('Connected to WebSocket server');

    socket.send(myList);
});

// Listen for messages from the server
socket.addEventListener('message', (event) => {
    console.log('Message from server: ', event.data);

    socket.close()
});


// Listen for the close event
socket.addEventListener('close', () => {
    console.log('Disconnected from server');
});
