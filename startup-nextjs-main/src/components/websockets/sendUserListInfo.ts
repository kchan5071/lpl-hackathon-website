import { useState, useEffect } from 'react';

// export const useWebSocket = () => {

//   // Function to establish connection and send data
//   const establishConnectionAndSend = ({ firstNames, lastNames }) => {
//     console.log("attempting connection to web socket");
//     const socket = new WebSocket("ws://127.0.0.1:8079");
//     // socket.onopen = () => {
//     //   setSocket(socket);
//     // }


//     // socket.onmessage = (event) => {
//     //   console.log("Connected to WebSocket server");

//     //   // Send firstNames and lastNames as JSON string
//     //   const jsonString = JSON.stringify({
//     //     firstNames,
//     //     lastNames,
//     //   });

//     //   socket.send(jsonString);

//     // }

//     // return () => {
//     //   if (socket.readyState === WebSocket.OPEN) {
//     //     socket.close();
//     //   }
//     // }
//     socket.addEventListener("open", () => {
//       console.log("Connected to WebSocket server");

//       // Send firstNames and lastNames as JSON string
//       const jsonString = JSON.stringify({
//         firstNames,
//         lastNames,
//       });

//       // Send the JSON string through the WebSocket
//       socket.send(jsonString);
//       console.log("Data sent:", jsonString); // Optional: Check the data being sent
//     });

//     // Handle messages from server
//     socket.addEventListener("message", (event: MessageEvent) => {
//       console.log("Message from server:", event.data);
//       const message = event.data; // Assuming the message is a string or JSON
//       // Close the socket after receiving the message
//       socket.close();
//     });

//     // Handle WebSocket close event
//     socket.addEventListener("close", () => {
//       console.log("Disconnected from server");
//     });
//   };

//   // Return the function to call and the card data to render

//   return { establishConnectionAndSend };
// };

export const useWebSocket = () => {
  // Function to establish connection and send data
  const establishConnectionAndSend = (
    { firstNames, lastNames },
    callback: (message: string) => void,
  ) => {
    const socket = new WebSocket("ws://localhost:8079");

    // Handle connection open
    socket.addEventListener("open", () => {
      console.log("Connected to WebSocket server");

      // Send firstNames and lastNames as JSON string
      const jsonString = JSON.stringify({
        firstNames,
        lastNames,
      });

      // Send the JSON string through the WebSocket
      socket.send(jsonString);
      console.log("Data sent:", jsonString); // Optional: Check the data being sent
    });

    // Handle messages from the server
    socket.addEventListener("message", (event: MessageEvent) => {
      console.log("Message from server:", event.data);
      const message = event.data; // Assuming the message is a string or JSON
      callback(message); // Call the callback with the message
      // Close the socket after receiving the message
      socket.close();
    });

    // Handle WebSocket close event
    socket.addEventListener("close", () => {
      console.log("Disconnected from server");
    });
  };

  // Return the function to call
  return { establishConnectionAndSend };
};
