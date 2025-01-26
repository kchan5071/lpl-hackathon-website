#!/usr/bin/env python
import json
import struct
import asyncio
from websockets.server import serve
from ai_service import Stock_Feedback

async def handleMessage(websocket):
    async for message in websocket:
        tmp = await serializeData(message)
        print(tmp)
        print(tmp[1], tmp[2])
        Stock_Feedback.summarize(tmp[0], tmp[1])
        await websocket.send(f"Recieved message")

async def serializeData(data):
    # determine how many bytes are in the prefix
    #prefix_len = struct.calcsize("!i")

    # we really should be more careful about indexes here ;)
    #data_len = struct.unpack("!i", data[:prefix_len])[0]
    #filteredData = data[prefix_len: data_len + prefix_len]
    print(data)

    l = json.loads(data)

    return l

async def main():
    async with serve(handleMessage, "localhost", 8079):
        await asyncio.get_running_loop().create_future()  # run forever

asyncio.run(main())
