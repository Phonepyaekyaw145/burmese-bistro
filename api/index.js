import "dotenv/config";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

// ======================================================
// GEMINI SETUP
// ======================================================

let gemini = null;

try {
  if (process.env.GEMINI_API_KEY) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    gemini = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    console.log("✅ Gemini AI connected");
  } else {
    console.log("⚠️ No GEMINI_API_KEY found");
  }
} catch (err) {
  console.log("❌ Gemini setup failed");
}

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());

app.use(express.json());

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    gemini: !!gemini,
  });
});

// ======================================================
// SUPPORT CHAT FALLBACK AI
// ======================================================

function getFallbackChatReply(message) {
  const msg = message.toLowerCase();

  // HOURS
  if (msg.includes("hour") || msg.includes("open") || msg.includes("close")) {
    return "🕒 Our opening hours are:\nMon-Fri: 7AM - 10PM\nSat: 7AM - 11PM\nSun: 8AM - 10PM";
  }

  // LOCATION
  if (
    msg.includes("location") ||
    msg.includes("address") ||
    msg.includes("where")
  ) {
    return "📍 Burmese Bistro\n88 Bogyoke Road, Yangon";
  }

  // DELIVERY
  if (msg.includes("delivery") || msg.includes("deliver")) {
    return "🚚 We offer delivery within 5km and usually arrive in about 30 minutes.";
  }

  // MENU
  if (msg.includes("menu") || msg.includes("food")) {
    return `🍜 Popular menu items:

• Mohinga — $8.50
• Shan Noodles — $7.50
• Laphet Thoke — $6.50
• Burmese Curry — $11.00
• Ohn No Khao Swe — $9.50`;
  }

  // DRINKS
  if (msg.includes("drink")) {
    return `🥤 Drinks:
• Myanmar Green Tea — $3
• Sugarcane Juice — $3.50
• Avocado Shake — $5`;
  }

  // RESERVATION
  if (msg.includes("reservation") || msg.includes("book")) {
    return "📞 Reservations are available! Please call us at +95 987654321.";
  }

  // DEFAULT
  return "🍜 Thanks for contacting Burmese Bistro! How can I help you today?";
}

// ======================================================
// REVIEW FALLBACK AI
// ======================================================

function generateFallbackReview(rating, text) {
  const safeRating = Number(rating) || 5;

  let sentiment = "Positive";
  let themes = [];
  let summary = "";
  let ownerReply = "";

  // POSITIVE
  if (safeRating >= 4) {
    sentiment = "Positive";

    themes = ["Great food", "Friendly service", "Cozy atmosphere"];

    summary = "Customer enjoyed the dining experience at Burmese Bistro.";

    ownerReply =
      "Thank you so much for your wonderful review! 🍜 We're very happy you enjoyed your experience at Burmese Bistro. We hope to serve you again soon!";
  }

  // NEUTRAL
  else if (safeRating === 3) {
    sentiment = "Neutral";

    themes = ["Average experience", "Needs improvement"];

    summary = "Customer had a mixed dining experience.";

    ownerReply =
      "Thank you for your honest feedback. We truly appreciate your support and will continue improving our food and service for a better experience next time.";
  }

  // NEGATIVE
  else {
    sentiment = "Negative";

    themes = ["Service issues", "Food quality concerns"];

    summary = "Customer was not satisfied with the overall experience.";

    ownerReply =
      "We're truly sorry your experience did not meet expectations. Thank you for sharing your feedback — we value it greatly and will work hard to improve.";
  }

  return {
    sentiment,
    score: safeRating,
    themes,
    summary,
    ownerReply,
  };
}

// ======================================================
// API CHAT
// ======================================================

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "messages array is required",
      });
    }

    const lastMessage = messages[messages.length - 1]?.content || "";

    // ==================================================
    // TRY GEMINI
    // ==================================================

    if (gemini) {
      try {
        const prompt = `
You are a helpful customer support agent for Burmese Bistro.

Restaurant Information:
- Mohinga $8.50
- Shan Noodles $7.50
- Laphet Thoke $6.50
- Burmese Curry $11
- Ohn No Khao Swe $9.50

Hours:
Mon-Fri 7AM-10PM
Sat 7AM-11PM
Sun 8AM-10PM

Location:
88 Bogyoke Road, Yangon

Delivery:
Within 5km (~30 minutes)

Customer Message:
${lastMessage}
`;

        const result = await gemini.generateContent(prompt);

        const reply = result?.response?.text?.()?.trim();

        if (reply) {
          return res.json({
            reply,
          });
        }
      } catch (geminiError) {
        console.log("⚠️ Gemini chat failed");
      }
    }

    // ==================================================
    // FALLBACK AI
    // ==================================================

    const fallbackReply = getFallbackChatReply(lastMessage);

    return res.json({
      reply: fallbackReply,
      fallback: true,
    });
  } catch (err) {
    console.error("❌ /api/chat error:", err);

    return res.json({
      reply: "⚠️ Sorry, support is temporarily unavailable.",
      fallback: true,
    });
  }
});

// ======================================================
// API REVIEW
// ======================================================

app.post("/api/review", async (req, res) => {
  try {
    const { rating, text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "review text is required",
      });
    }

    // ==================================================
    // TRY GEMINI
    // ==================================================

    if (gemini) {
      try {
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

        const result = await gemini.generateContent(prompt);

        let raw = result?.response?.text?.()?.trim() || "";

        raw = raw.replace(/```json|```/g, "").trim();

        const parsed = JSON.parse(raw);

        // CUSTOM REPLY BASED ON STARS
        if (Number(rating) < 4) {
          parsed.ownerReply =
            "We're sorry your experience was not perfect. Thank you for your feedback — we will continue improving our food and service.";
        }

        return res.json(parsed);
      } catch (geminiError) {
        console.log("⚠️ Gemini review failed");
      }
    }

    // ==================================================
    // FALLBACK AI
    // ==================================================

    const fallback = generateFallbackReview(rating, text);

    return res.json({
      ...fallback,
      fallback: true,
    });
  } catch (err) {
    console.error("❌ /api/review error:", err);

    return res.json(generateFallbackReview(req.body.rating, req.body.text));
  }
});

// ======================================================
// EXPORT FOR VERCEL
// ======================================================

export default serverless(app);
