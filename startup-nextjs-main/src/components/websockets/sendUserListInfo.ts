// useWebSocket.ts
export const useWebSocket = () => {
  const establishConnectionAndSend = (combinedEntries: {
    [key: string]: string;
  }) => {
    const socket = new WebSocket("ws://localhost:8079");

    // Handle connection open
    socket.addEventListener("open", () => {
      console.log("Connected to WebSocket server");
      // Send firstNames and lastNames as JSON string
      // Convert the object to a JSON string
      const jsonString = JSON.stringify(combinedEntries);

      // Send the JSON string through the WebSocket
      socket.send(jsonString);

      console.log("Data sent:", jsonString); // Optional: Check the data being sent
    });

    // Handle messages from server
    socket.addEventListener("message", (event: MessageEvent) => {
      console.log("Message from server:", event.data);
      socket.close();
    });

    // Handle WebSocket close event
    socket.addEventListener("close", () => {
      console.log("Disconnected from server");
    });
  };

  return { establishConnectionAndSend };
};
