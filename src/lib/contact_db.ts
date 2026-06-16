import fs from "fs";
import path from "path";
import clientPromise from "./mongodb";

const DATA_DIR = path.join(process.cwd(), "data", "analytics");
const FILE_NAME = "contact_messages.jsonl";
const FILE_PATH = path.join(DATA_DIR, FILE_NAME);

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  replied: boolean;
  replyText?: string;
  repliedAt?: string;
}

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Fetch all contact messages (MongoDB with local JSONL fallback).
 */
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "portfolio_analytics");
      const docs = await db.collection("contact_messages").find({}).toArray();
      
      // Sort and remove MongoDB ObjectId to prevent serialization crashes
      const list = docs.map((doc) => {
        const clean = { ...doc } as Record<string, unknown>;
        delete clean._id;
        return clean as unknown as ContactMessage;
      });
      
      return list;
    }

    // Local filesystem fallback
    ensureDir();
    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }

    const content = await fs.promises.readFile(FILE_PATH, "utf-8");
    return content
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        try {
          return JSON.parse(line) as ContactMessage;
        } catch {
          return null;
        }
      })
      .filter((item): item is ContactMessage => item !== null);
  } catch (error) {
    console.error("Error reading contact messages:", error);
    return [];
  }
}

/**
 * Save a new contact form message (MongoDB with local JSONL fallback).
 */
export async function saveContactMessage(
  data: Omit<ContactMessage, "id" | "timestamp" | "replied">
): Promise<ContactMessage> {
  try {
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "portfolio_analytics");
      
      // Generate sequential ID based on collection size
      const count = await db.collection("contact_messages").countDocuments();
      const id = `msg-${count + 1}`;
      
      const newMessage: ContactMessage = {
        ...data,
        id,
        timestamp: new Date().toISOString(),
        replied: false,
      };

      await db.collection("contact_messages").insertOne({ ...newMessage });
      return newMessage;
    }
  } catch (error) {
    console.error("Error saving to MongoDB, attempting local fallback...", error);
  }

  // Local filesystem fallback
  ensureDir();
  const existing = await getContactMessages();
  const nextNumber = existing.length + 1;
  const id = `msg-${nextNumber}`;

  const newMessage: ContactMessage = {
    ...data,
    id,
    timestamp: new Date().toISOString(),
    replied: false,
  };

  const line = JSON.stringify(newMessage) + "\n";
  await fs.promises.appendFile(FILE_PATH, line, "utf-8");
  return newMessage;
}

/**
 * Mark a message as replied (MongoDB with local JSONL fallback).
 */
export async function markAsReplied(id: string, replyText: string): Promise<boolean> {
  try {
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "portfolio_analytics");
      const res = await db.collection("contact_messages").updateOne(
        { id: { $regex: new RegExp(`^${id}$`, "i") } },
        {
          $set: {
            replied: true,
            replyText,
            repliedAt: new Date().toISOString(),
          },
        }
      );
      return res.modifiedCount > 0;
    }

    // Local filesystem fallback
    ensureDir();
    const messages = await getContactMessages();
    let updated = false;

    const updatedMessages = messages.map((msg) => {
      if (msg.id.toLowerCase() === id.toLowerCase()) {
        updated = true;
        return {
          ...msg,
          replied: true,
          replyText,
          repliedAt: new Date().toISOString(),
        };
      }
      return msg;
    });

    if (!updated) {
      return false;
    }

    const fileContent = updatedMessages.map((msg) => JSON.stringify(msg)).join("\n") + "\n";
    await fs.promises.writeFile(FILE_PATH, fileContent, "utf-8");
    return true;
  } catch (error) {
    console.error(`Error marking message ${id} as replied:`, error);
    return false;
  }
}
