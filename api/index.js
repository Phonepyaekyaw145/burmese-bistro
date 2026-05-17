import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  try {
    // Allow POST only
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    // Check API key
    if (!API_KEY) {
      return res.status(500).json({
        error: "Missing GEMINI_API_KEY",
      });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const { type } = req.query;

    // =========================
    // SUPPORT CHAT
    // =========================

    if (type === "chat") {
      const { messages } = req.body || {};

      const lastMessage = messages?.[messages.length - 1]?.content || "Hello";

      const prompt = `
You are a helpful customer support AI for Burmese Bistro.

Menu:
- Mohinga $8.50
- Shan Noodles $7.50
- Tea Leaf Salad $6.50
- Burmese Curry $11

Answer politely and briefly.

Customer message:
${lastMessage}
`;

      const result = await model.generateContent(prompt);

      const reply = result.response.text();

      return res.status(200).json({
        reply,
      });
    }

    // =========================
    // REVIEW ANALYSIS
    // =========================

    if (type === "review") {
      const { name, rating, text, systemPrompt } = req.body;

      const prompt = `
${systemPrompt}

Customer Name: ${name}
Rating: ${rating}/5

Review:
${text}

Return ONLY valid JSON.

{
  "sentiment": "Positive",
  "score": 5,
  "themes": ["Food", "Service"],
  "summary": "Short summary",
  "ownerReply": "Friendly reply"
}
`;

      const result = await model.generateContent(prompt);

      const raw = result.response.text();

      const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      return res.status(200).json(parsed);
    }

    return res.status(400).json({
      error: "Invalid API type",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Gemini API failed",
      details: err.message,
    });
  }
}
