// api/index.js

import "dotenv/config";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(express.json());

// ======================
// GEMINI SETUP
// ======================

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const gemini = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

// ======================
// HEALTH CHECK
// ======================

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "API working",
  });
});

// ======================
// CHAT API
// ======================

app.post("/api/chat", async (req, res) => {
  try {
    console.log("✅ Chat request received");

    const { messages } = req.body;

    const lastMessage = messages?.[messages.length - 1]?.content || "Hello";

    const prompt = `
You are a helpful customer support AI for Burmese Bistro.

Restaurant Information:
- Mohinga $8.50
- Shan Noodles $7.50
- Tea Leaf Salad $6.50
- Burmese Curry $11
- Coconut Noodles $9.50

Opening Hours:
Mon-Fri: 7AM - 10PM
Sat: 7AM - 11PM
Sun: 8AM - 10PM

Location:
88 Bogyoke Road, Yangon

Delivery:
Available within 5km.

Customer Message:
${lastMessage}
`;

    // Timeout protection
    const result = await Promise.race([
      gemini.generateContent(prompt),

      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 15000),
      ),
    ]);

    console.log("✅ Gemini replied");

    const reply = result.response.text();

    return res.json({
      reply,
    });
  } catch (err) {
    console.error("❌ Chat API Error:", err);

    return res.status(500).json({
      error: err.message || "AI failed",
    });
  }
});

// ======================
// REVIEW API
// ======================

app.post("/api/review", async (req, res) => {
  try {
    console.log("✅ Review request received");

    const { rating, text } = req.body;

    const prompt = `
Analyze this restaurant review.

Return ONLY valid JSON.

{
  "sentiment": "Positive",
  "score": 5,
  "themes": ["Great food"],
  "summary": "Short summary",
  "ownerReply": "Friendly reply"
}

Review:
${text}

Rating:
${rating}/5
`;

    // Timeout protection
    const result = await Promise.race([
      gemini.generateContent(prompt),

      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 15000),
      ),
    ]);

    console.log("✅ Gemini review replied");

    let raw = result.response.text();

    raw = raw.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(raw);

    return res.json(parsed);
  } catch (err) {
    console.error("❌ Review API Error:", err);

    return res.status(500).json({
      error: err.message || "Review AI failed",
    });
  }
});

// ======================
// EXPORT
// ======================

export default serverless(app);
