import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  console.log("BOOKING API CALLED");
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

    const bookings = db.collection("bookings");

    const result = await bookings.insertOne({
      ...req.body,
      createdAt: new Date(),
    });

    await client.close();

    return res.status(200).json({
      success: true,
      bookingId: result.insertedId,
    });
  } catch (err) {
    console.error("BOOKING ERROR:");
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
