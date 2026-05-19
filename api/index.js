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
          model: "gemini-2.5-flash-lite",
        });

        const prompt = `
You are a helpful customer support AI for Burmese Bistro.

Menu:
- Mohinga 25000 MMK
- Shan Noodles 22000 MMK
- Tea Leaf Salad 30000 MMK
- Ohn No Khao Swe 25000 MMK
- Samusa 8000 MMK
- Myanmar Green Tea 15000 MMK

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

        if (msg.includes("hours")) {
          reply = "🕒 Burmese Bistro is open daily from 10 AM to 9 PM.";
        } else if (msg.includes("delivery") || msg.includes("deliver")) {
          reply = "🚚 Yes! We offer delivery within the city area.";
        } else if (msg.includes("reservation") || msg.includes("book")) {
          reply =
            "📞 You can make a reservation by contacting Burmese Bistro directly.";
        } else if (
          msg.includes("popular") ||
          msg.includes("dishes") ||
          msg.includes("Mohinga")
        ) {
          reply =
            "🍜 Our popular dishes include Mohinga, Shan Noodles, Tea Leaf Salad, and Burmese Curry.";
        } else if (msg.includes("price")) {
          reply = "💵 Most dishes range from 8000 MMK to 30000 MMK.";
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
          model: "gemini-2.5-flash-lite",
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
  "ownerReply": "If rating is below 4, politely apologize and respond professionally. If rating is 4 or above, show appreciation warmly and thankfully."
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
          ownerReply:
            rating < 4
              ? `🙏 We're very sorry ${
                  name || "guest"
                } that your experience did not meet expectations. Thank you for your honest feedback. We will work hard to improve our food and service, and we hope to serve you better next time.`
              : `💛 Thank you so much ${
                  name || "guest"
                } for your wonderful review and support! We're truly happy that you enjoyed your experience at Burmese Bistro. We look forward to serving you again soon!`,
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
