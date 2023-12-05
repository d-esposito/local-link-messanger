import json
import asyncio
import websockets
from pymongo import MongoClient, DESCENDING
from pymongo.collection import Collection

def get_database_collection(client: MongoClient, db_name, collection_name):
    db = client[db_name]

    if collection_name not in db.list_collection_names():
        print(f"Creating database collection: {collection_name}")
        db.create_collection(collection_name)
    
    return db[collection_name]

def get_latest_messages(collection: Collection, max_messages=50):
    recent_messages = collection.find({}, {'_id': False}).sort("unixTimestamp", DESCENDING).limit(max_messages)
    return recent_messages


client = MongoClient("mongodb://database:27017/")
collection = get_database_collection(client, "llm", "messages")
clients = []

async def handle_client(websocket, path):
    clients.append(websocket)
    print(f"new client: {websocket}")

    recent_messages = get_latest_messages(collection)
    for recent_message in recent_messages:
        await websocket.send(json.dumps(recent_message))

    try:
        while True:
            message = await websocket.recv()
            collection.insert_one(json.loads(message))

            for client in clients:
                await client.send(message)
    finally:
        clients.remove(websocket)

start_server = websockets.serve(handle_client, "0.0.0.0", 8081)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()