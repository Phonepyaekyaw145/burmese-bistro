import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    await client.connect();

    const db = client.db("qr-system");

    const guests = db.collection("guests");

    const result = await guests.insertOne({
      ...req.body,
      createdAt: new Date(),
    });

    return res.status(200).json({
      success: true,
      guestId: result.insertedId,
    });
  } catch (err) {
    console.error("AUTH API ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
