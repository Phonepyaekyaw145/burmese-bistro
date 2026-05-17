import "dotenv/config";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const gemini = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

// ======================
// CHAT API
// ======================

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const lastMessage = messages?.[messages.length - 1]?.content || "Hello";

    const prompt = `
You are a helpful Burmese Bistro restaurant assistant.

Restaurant:
- Mohinga $8.50
- Shan Noodles $7.50
- Tea Leaf Salad $6.50
- Burmese Curry $11

Hours:
Mon-Fri 7AM-10PM
Sat 7AM-11PM
Sun 8AM-10PM

Customer Message:
${lastMessage}
`;

    const result = await gemini.generateContent(prompt);

    const reply = result.response.text();

    res.json({
      reply,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "AI failed",
    });
  }
});

// ======================
// REVIEW API
// ======================

app.post("/api/review", async (req, res) => {
  try {
    const { rating, text } = req.body;

    const prompt = `
Analyze this restaurant review.

Return ONLY valid JSON:

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

    const result = await gemini.generateContent(prompt);

    let raw = result.response.text();

    raw = raw.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(raw);

    res.json(parsed);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Review AI failed",
    });
  }
});

export default serverless(app);
