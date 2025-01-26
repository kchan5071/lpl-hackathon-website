const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    // Send a message back to the client
    ws.send("Hello from server!");
  });

  // Send a message to the client when it connects
  ws.send("Welcome to the WebSocket server!");
});

console.log("WebSocket server started on ws://localhost:8080");
