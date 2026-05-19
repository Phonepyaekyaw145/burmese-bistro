import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await client.connect();

    const db = client.db("qr-system");

    const bookings = db.collection("bookings");

    const result = await bookings.insertOne({
      ...req.body,
      createdAt: new Date(),
    });

    return res.status(200).json({
      success: true,
      bookingId: result.insertedId,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
