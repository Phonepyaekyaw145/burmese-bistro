import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  console.log("AUTH API CALLED");
  console.log("MONGODB URI EXISTS:", !!uri);

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    if (!uri) {
      throw new Error("MONGODB_URI missing");
    }

    const client = new MongoClient(uri);

    await client.connect();

    console.log("CONNECTED TO MONGODB");

    const db = client.db("qr-system");

    const guests = db.collection("guests");

    const result = await guests.insertOne({
      ...req.body,
      createdAt: new Date(),
    });

    await client.close();

    return res.status(200).json({
      success: true,
      guestId: result.insertedId,
    });
  } catch (err) {
    console.error("AUTH ERROR:");
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
