import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  try {
    // =========================
    // ALLOW POST ONLY
    // =========================

    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    const { type } = req.query;

    // =========================
    // SUPPORT CHAT
    // =========================

    if (type === "chat") {
      const { messages } = req.body || {};

      const lastMessage = messages?.[messages.length - 1]?.content || "Hello";

      // =========================
      // TRY GEMINI FIRST
      // =========================

      try {
        if (!API_KEY) {
          throw new Error("Missing GEMINI_API_KEY");
        }

        const genAI = new GoogleGenerativeAI(API_KEY);

        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

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
          ai: true,
        });
      } catch (err) {
        console.error("Gemini Chat Failed:", err.message);

        // =========================
        // FALLBACK CHAT SYSTEM
        // =========================

        const msg = lastMessage.toLowerCase();

        let reply =
          "🙏 Our AI assistant is currently busy. Please try again later.";

        if (msg.includes("hour")) {
          reply = "🕒 Burmese Bistro is open daily from 10 AM to 9 PM.";
        } else if (msg.includes("delivery") || msg.includes("deliver")) {
          reply = "🚚 Yes! We offer delivery within the city area.";
        } else if (msg.includes("reservation") || msg.includes("book")) {
          reply =
            "📞 You can make a reservation by contacting Burmese Bistro directly.";
        } else if (msg.includes("menu") || msg.includes("food")) {
          reply =
            "🍜 Our popular dishes include Mohinga, Shan Noodles, Tea Leaf Salad, and Burmese Curry.";
        } else if (msg.includes("price")) {
          reply = "💵 Most dishes range from $6.50 to $11.";
        } else if (msg.includes("hello") || msg.includes("hi")) {
          reply = "👋 Hello! Welcome to Burmese Bistro support.";
        }

        return res.status(200).json({
          reply,
          ai: false,
          fallback: true,
        });
      }
    }

    // =========================
    // REVIEW ANALYSIS
    // =========================

    if (type === "review") {
      const { name, rating, text, systemPrompt } = req.body;

      // =========================
      // TRY GEMINI FIRST
      // =========================

      try {
        if (!API_KEY) {
          throw new Error("Missing GEMINI_API_KEY");
        }

        const genAI = new GoogleGenerativeAI(API_KEY);

        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

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

        return res.status(200).json({
          ...parsed,
          ai: true,
        });
      } catch (err) {
        console.error("Gemini Review Failed:", err.message);

        // =========================
        // FALLBACK REVIEW SYSTEM
        // =========================

        let sentiment = "Neutral";

        if (rating >= 4) sentiment = "Positive";

        if (rating <= 2) sentiment = "Negative";

        let themes = ["Food"];

        const lower = text.toLowerCase();

        if (lower.includes("service")) {
          themes.push("Service");
        }

        if (lower.includes("atmosphere")) {
          themes.push("Atmosphere");
        }

        return res.status(200).json({
          sentiment,
          score: rating,
          themes,
          summary: "Thank you for sharing your experience with Burmese Bistro.",
          ownerReply: `🙏 Thank you ${
            name || "guest"
          }! We truly appreciate your feedback and hope to serve you again soon.`,
          ai: false,
          fallback: true,
        });
      }
    }

    // =========================
    // INVALID TYPE
    // =========================

    return res.status(400).json({
      error: "Invalid API type",
    });
  } catch (err) {
    console.error("Server Error:", err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
