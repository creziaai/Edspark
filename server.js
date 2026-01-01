// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/answer", async (req, res) => {
  const { question, description, subject } = req.body;

  if (!question || !subject) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const prompt = `
You are a highly professional tutor.
Answer step by step, clearly and innovatively like a real teacher.

Subject: ${subject}
Question: ${question}
Additional Details: ${description || "None"}

Provide a detailed explanation with examples and tips.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "StudySpark",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-coder:free",
          messages: [
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1200,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
