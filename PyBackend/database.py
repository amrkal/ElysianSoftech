from pymongo import MongoClient
import os

# Initialize the MongoDB connection
def init_db():
    # Get MongoDB URI from environment variable or hardcode it for development
    client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
    
    # Specify the database name explicitly
    db = client.get_database("mydatabase")  # Replace "mydatabase" with your actual database name
    return db
