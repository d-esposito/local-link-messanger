from pymongo import MongoClient, DESCENDING

class DatabaseManager:
    def __init__(self, db_name, collection_name, connection_string="mongodb://database:27017/"):
        self.client = MongoClient(connection_string)
        self.db_name = db_name
        self.collection_name = collection_name
        self.collection = self.get_or_create_collection()

    def get_or_create_collection(self):
        db = self.client[self.db_name]

        if self.collection_name not in db.list_collection_names():
            db.create_collection(self.collection_name)

        return db[self.collection_name]

    def get_latest_messages(self, max_messages=50):
        recent_messages = self.collection.find({}, {'_id': False}).sort("unixTimestamp", DESCENDING).limit(max_messages)
        return recent_messages

    def insert_message(self, message):
        self.collection.insert_one(message)
