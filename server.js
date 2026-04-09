import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { readFileSync } from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// Load API key from .env file manually
let ANTHROPIC_API_KEY = "";
try {
  const env = readFileSync(".env", "utf-8");
  const match = env.match(/ANTHROPIC_API_KEY=(.+)/);
  if (match) ANTHROPIC_API_KEY = match[1].trim();
} catch {
  // .env not found
}

const SYSTEM_PROMPT = `You are PrintBot, a friendly AI design assistant for Insta Printing — a premium custom print and merch studio.

You help users with:
1. Choosing the right product (mugs, hoodies, tote bags, t-shirts, posters, caps)
2. Design ideas — text, fonts, colors, graphics, layout
3. Personalization — ask about theme, who it is for, style preferences
4. Order guidance — selecting size/variant, uploading images, adding to cart

Available products:
- Classic Heavyweight Tee — $29.99
- Premium Pullover Hoodie — $54.99
- Matte Finish Poster Print — $19.99
- Ceramic Mug 11oz — $16.99
- Canvas Tote Bag — $22.99
- Embroidered Cap — $27.99

When suggesting a design, use this format:
Product: [name]
Text: "[suggested text]"
Colors: [suggestions]
Graphic: [concept]
Placement: [position]
Style: [minimal / bold / vintage / funny / romantic]

Rules:
- Be warm, creative, concise
- Only discuss products, design, customization, ordering
- If user is unsure, ask 1-2 guiding questions first`;

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: "API key not found. Please add ANTHROPIC_API_KEY to your .env file.",
    });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No messages provided" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: String(m.content),
        })),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[PrintBot] Anthropic error:", response.status, errText);

      if (response.status === 401)
        return res.status(401).json({ error: "Invalid API key. Check your .env file." });
      if (response.status === 429)
        return res.status(429).json({ error: "Rate limit reached. Please wait and try again." });

      const errData = JSON.parse(errText);
      return res.status(response.status).json({ error: errData?.error?.message || "AI service error" });
    }

    const data = await response.json();
    const message = data?.content?.[0]?.text ?? "";

    console.log("[PrintBot] Response sent successfully");
    res.json({ message });
  } catch (err) {
    console.error("[PrintBot] Network error:", err);
    res.status(502).json({ error: "Could not reach AI service. Check your internet connection." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[PrintBot] Server running on http://localhost:${PORT}`);
  console.log(`[PrintBot] API key: ${ANTHROPIC_API_KEY ? "✅ Found" : "❌ Missing — add to .env"}`);
});
