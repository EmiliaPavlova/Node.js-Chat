import { MongoClient } from 'mongodb';

const connectionString = "mongodb://localhost:27017/node-db-chat";

const db = MongoClient.connect(connectionString);

module.exports = db;
