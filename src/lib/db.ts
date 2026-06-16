import fs from "fs";
import path from "path";
import clientPromise from "./mongodb";

// Define local path fallback
const DATA_DIR = path.join(process.cwd(), "data", "analytics");

export interface SessionRecord {
  id: string;
  startTime: string; // ISO string
  browser: string;
  os: string;
  device: string;
  referrer: string;
  country: string;
  ipHash: string;
  lastActive: string; // ISO string
}

export interface ViewRecord {
  sessionId: string;
  path: string; // e.g. '/' or '#projects'
  type: "page" | "section";
  timestamp: string; // ISO string
  duration: number; // duration in seconds
}

export interface EventRecord {
  sessionId: string;
  eventType: string; // e.g., 'click', 'form_submit'
  eventName: string; // e.g., 'resume_download', 'contact_submit'
  eventValue?: string;
  timestamp: string; // ISO string
}

// Helper: Ensure the local data directory exists
function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Helper: Append a record dynamically (MongoDB with local JSONL fallback)
export async function appendRecord(
  file: "sessions.jsonl" | "views.jsonl" | "events.jsonl",
  record: Record<string, unknown>
): Promise<void> {
  try {
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "portfolio_analytics");
      const collectionName = file.replace(".jsonl", "");
      await db.collection(collectionName).insertOne({ ...record });
      return;
    }

    // Local filesystem fallback
    ensureDir();
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.stringify(record) + "\n";
    await fs.promises.appendFile(filePath, data, "utf-8");
  } catch (error) {
    console.error(`Error appending record to ${file}:`, error);
  }
}

// Helper: Read all records dynamically (MongoDB with local JSONL fallback)
export async function readRecords<T>(
  file: "sessions.jsonl" | "views.jsonl" | "events.jsonl"
): Promise<T[]> {
  try {
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "portfolio_analytics");
      const collectionName = file.replace(".jsonl", "");
      const docs = await db.collection(collectionName).find({}).toArray();
      
      // Remove MongoDB _id to prevent serialization issues in Next.js response
      return docs.map((doc) => {
        const clean = { ...doc } as Record<string, unknown>;
        delete clean._id;
        return clean as unknown as T;
      });
    }

    // Local filesystem fallback
    ensureDir();
    const filePath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    
    const content = await fs.promises.readFile(filePath, "utf-8");
    return content
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        try {
          return JSON.parse(line) as T;
        } catch (err) {
          console.error(`Error parsing JSON line from ${file}:`, err);
          return null;
        }
      })
      .filter((item): item is T => item !== null);
  } catch (error) {
    console.error(`Error reading records from ${file}:`, error);
    return [];
  }
}
