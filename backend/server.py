import asyncio
import websockets

clients = []

async def handle_client(websocket, path):
    clients.append(websocket)
    print(f"new client: {websocket}")
    
    try:
        while True:
            message = await websocket.recv()

            for client in clients:
                await client.send(message)
    finally:
        clients.remove(websocket)

start_server = websockets.serve(handle_client, "0.0.0.0", 8081)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()