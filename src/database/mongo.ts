import { config } from "dotenv";
config(); // This should be the
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGO_URI environment variable not set");
  process.exit(1);
}

const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
}

export const db = client.db("social-app");
