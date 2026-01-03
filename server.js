import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ✅ API ROUTE
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
          "HTTP-Referer": "https://your-render-url.onrender.com",
          "X-Title": "StudySpark"
        },
        body: JSON.stringify({
          model: "qwen/qwen3-coder:free",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 1200
        })
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

// ✅ SERVE FRONTEND
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
