import json
import logging
import asyncio
import websockets
from DatabaseManager import DatabaseManager

class WebSocketServer:
    def __init__(self, host="0.0.0.0", port=8081):
        self.host = host
        self.port = port
        self.clients = set()
        self.database_manager = DatabaseManager(db_name="llm", collection_name="messages")

    async def handle_client(self, websocket, path):
        self.clients.add(websocket)

        recent_messages = self.database_manager.get_latest_messages()
        for recent_message in recent_messages:
            await websocket.send(json.dumps(recent_message))

        try:
            while True:
                message = await websocket.recv()
                self.database_manager.insert_message(json.loads(message))

                for client in self.clients:
                    await client.send(message)
        except websockets.exceptions.ConnectionClosedOK:
            self.clients.remove(websocket)
        except websockets.exceptions.ConnectionClosedError as e:
            logging.error(f"Error closing connection to client: {e}")
            self.clients.remove(websocket)
        except Exception as e:
            logging.error(f"Error with websocket connection to client: {e}")
            self.clients.remove(websocket)

    def start_server(self):
        start_server = websockets.serve(self.handle_client, self.host, self.port)
        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()
