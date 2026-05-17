import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // Allow POST only
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { messages } = req.body;

    const lastMessage = messages?.[messages.length - 1]?.content || "Hello";

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a helpful customer support AI for Burmese Bistro.

Restaurant Information:
- Mohinga $8.50
- Shan Noodles $7.50
- Tea Leaf Salad $6.50
- Burmese Curry $11

Customer Message:
${lastMessage}
`;

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    return res.status(200).json({
      reply,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Gemini API failed",
    });
  }
}
