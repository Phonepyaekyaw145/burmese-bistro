import express from "express";
import serverless from "serverless-http";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
  });
});

app.post("/api/chat", async (req, res) => {
  return res.json({
    reply: "Hello from Vercel API 🚀",
  });
});

export default serverless(app);
