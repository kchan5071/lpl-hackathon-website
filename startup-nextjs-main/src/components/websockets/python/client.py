import json
import asyncio
import websockets

async def deserializeData(serializedData):
    return json.dumps(serializedData)

# Function to handle the chat client
async def sendData(msg):
    async with websockets.connect('ws://localhost:8080') as websocket:
        # Send the message to the server
        await websocket.send(await deserializeData(msg))
        response = await websocket.recv()
        print(f"Received: {response}")

def entryPoint(message):
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:  # 'RuntimeError: There is no current event loop...'
        loop = None

    if loop and loop.is_running():
        print('Async event loop already running. Adding coroutine to the event loop.')
        tsk = loop.create_task(sendData(message))
    else:
        print('Starting new event loop')
        asyncio.run(sendData(message))
