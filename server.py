import asyncio
import websockets
import json

USERS = set()

async def handler(websocket):
    # Register user
    USERS.add(websocket)
    try:
        async for message in websocket:
            for user in USERS:
                if user == websocket:
                    jsonMsg = json.loads(message)
                    await user.send(json.dumps({"from" : "You", "msg": jsonMsg['msg']}))
                else:
                    await user.send(message)
    finally:
        USERS.remove(websocket)

async def main():
    async with websockets.serve(handler, "localhost", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())