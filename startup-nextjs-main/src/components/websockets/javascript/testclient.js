

// Track the WebSocket connection state
let isSocketOpen = false;


// const WebSocket = require('ws');

// const socket = new WebSocket('ws://localhost:8079');

// const stock_names = ["APPL", "GOOGL", "AMZN", "TSLA"];

// const stock_percentages = [6, 7, 8, 9];

// const myLists = {stock_names, stock_percentages};

// const jsonString = JSON.stringify(myLists);

// // Listen for the connection event
// socket.addEventListener('open', (event) => {
//     console.log('Connected to WebSocket server');



//     // socket.send('Ur fu  cking ugly');
//     socket.send(jsonString);
//     isSocketOpen = true; // Set to true when connection is open
//     //sendMessageButton.disabled = false; // Enable the button after connection is open
// });

// // Listen for messages from the server
// socket.addEventListener('message', (event) => {
//     console.log('Message from server: ', event.data);

//     socket.close()
//     //sendMessageButton.disabled = false; // Disable the button if connection is closed
// });


// // Listen for the close event
// socket.addEventListener('close', () => {
//     console.log('Disconnected from server');
// });


const WebSocket = require('ws');

// Use process.argv to include 'node', filename, and parameters
const args = process.argv;

console.log('All Arguments:', args);

// The 0th element is the node executable
const nodeExecutable = args[0];

// The 1st element is the script filename
const scriptFilename = args[1];

// Any additional arguments are the parameters
const parameters = args.slice(2);

console.log('Node Executable:', nodeExecutable);
console.log('Script Filename:', scriptFilename);
console.log('Parameters:', parameters);

// Example: Use the first parameter as the WebSocket message
if (parameters.length === 0) {
    console.error('Please provide a message to send as a parameter.');
    process.exit(1);
}

const messageToSend = parameters.join(' ');

const socket = new WebSocket('ws://localhost:8079');

// WebSocket setup
socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
    socket.send(messageToSend);
    console.log(`Message sent to server: ${messageToSend}`);
});

socket.addEventListener('message', (event) => {
    console.log('Message from server:', event.data);
    socket.close();
});

socket.addEventListener('close', () => {
    console.log('Disconnected from server');
});
