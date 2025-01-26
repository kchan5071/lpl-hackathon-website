#!/usr/bin/env python
import json
import asyncio
import websockets
from ai_service import Stock_Feedback

# Set to track connected clients
connected_clients = set()

async def processData(data):
    # Call the summarize function
    print("names", data[0])
    print("vals", data[1])
    outsource_call = Stock_Feedback()
    response = outsource_call.summarize(data[0], data[1])
    return response
    
async def handleMessage(websocket):
    # Add the client to the connected_clients set
    print(f"New connection attempt from client: {websocket.remote_address}")
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            # Serialize the data
            try:
                tmp = await serializeData(message)

                response = await processData(tmp[1])

                await websocket.send(response)
                
                # Broadcast the message to all other clients
                for client in connected_clients:
                    if client != websocket:  # Avoid sending the message back to the sender
                        await client.send(response)


            except json.JSONDecodeError:
                # Handle the case where the message is not valid JSON
                print(f"Invalid JSON received: {message}")
                await websocket.send("Error: Invalid JSON")
            
            except Exception as e:
                # Catch any other exceptions and log them
                print(f"Error while processing the message: {e}")
                await websocket.send(f"Error processing message: {e}")

    except websockets.exceptions.ConnectionClosed:
        print(f"Connection closed with client {websocket}")
    finally:
        # Remove the client from the set when they disconnect
        connected_clients.remove(websocket)
        print(f"Connection closed with client {websocket}")


async def serializeData(data):
    # Deserialize the message from JSON and separate keys and values
    try:
        print(f"Original data: {data}")
        l = json.loads(data)

        key_list = []
        value_list = []

        for key, value in l.items():
            key_list.append(key)
            value_list.append(value)

        return key_list, value_list
    except json.JSONDecodeError:
        raise json.JSONDecodeError("Invalid JSON format in the data")
    except Exception as e:
        print(f"Error during serialization: {e}")
        raise

async def main():
    # Start the WebSocket server on localhost:8079
    server = await websockets.serve(handleMessage, "localhost", 8079)
    print("WebSocket server running on ws://localhost:8079")
    await server.wait_closed()

# Run the WebSocket server
asyncio.run(main())

