
// // Get references to elements
// const messageBox = document.getElementById('message');
// const getMessageButton = document.getElementById('sendMessageButton');


// Track the WebSocket connection state
let isSocketOpen = false;
// sendMessageButton.disabled = true; // Disable the button if connection is closed
// Add event listener for button click
// getMessageButton.addEventListener('click', function () {
//     // Extract message from the message box (textarea)
//     const message = 'some string'; //messageBox.value;

//     // Check if message is not empty
//     if (isSocketOpen && message.trim()) { 
//         socket.send(message);  // Send the message through WebSocket
//         console.log('Message sent:', message);
//         messageBox.value = '';  // Clear the message box after sending the message
//     } else if (!isSocketOpen) {
//         console.log('WebSocket connection is not open!');
//     } else {
//         console.log('Message is empty!');
//     }

// });

const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:8079');

const myList1 = [1, 2, 3, 4, 5];

const myList2 = [6, 7, 8, 9, 10];

const myLists = {myList1, myList2};

const jsonString = JSON.stringify(myLists);

// Listen for the connection event
socket.addEventListener('open', (event) => {
    console.log('Connected to WebSocket server');



    //socket.send('Ur fucking ugly');
    socket.send(jsonString);
    isSocketOpen = true; // Set to true when connection is open
    //sendMessageButton.disabled = false; // Enable the button after connection is open
});

// Listen for messages from the server
socket.addEventListener('message', (event) => {
    console.log('Message from server: ', event.data);

    socket.close()
    //sendMessageButton.disabled = false; // Disable the button if connection is closed
});


// Listen for the close event
socket.addEventListener('close', () => {
    console.log('Disconnected from server');
});
