import { connectDB } from "../lib/db";
import Guest from "../models/Guest";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const guest = await Guest.create(req.body);

  res.status(200).json(guest);
}
