import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await client.connect();
    const db = client.db("qr-system");

    const bookings = db.collection("bookings");

    const result = await bookings.insertOne({
      ...req.body,
      createdAt: new Date(),
    });

    res.status(200).json({
      success: true,
      bookingId: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
