import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to preserve the connection
    // across hot reloads.
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, create a standard client promise.
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export default clientPromise;
