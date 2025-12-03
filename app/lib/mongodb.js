import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please add MONGODB_URI to .env.local");

let client = global._mongoClient;
let clientPromise;

if (!client) {
  client = new MongoClient(uri);
  global._mongoClient = client;
}

clientPromise = client.connect();
export default clientPromise;
