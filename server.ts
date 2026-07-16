import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Profile from "./src/models/Profile.js";
import Expense from "./src/models/Expense.js";
import Settings from "./src/models/Settings.js";
dotenv.config();
const DEFAULT_DB = {
  profile: {
    name: "Alexander Specter",
    tier: "Founding Member • Premium Tier",
    role: "Strategic Philanthropist & Portfolio Architect",
    memberSince: "January 2021",
    region: "India (₹)",
    currencySymbol: "₹",
    email: "alexander@gmail.com",
    avatarUrl: "🦊"
  },
  expenses: [
    {
      id: "exp_1",
      title: "Vercel Inc.",
      category: "Shopping & Tech",
      amount: 1650.00,
      date: "2024-08-24",
      notes: "Vercel Hosting Infrastructure",
      type: "expense",
      timestamp: "Aug 24, 2024 • 10:45 AM",
      icon: "terminal"
    },
    {
      id: "exp_2",
      title: "Equinox Luxury",
      category: "Entertainment",
      amount: 12400.00,
      date: "2024-08-22",
      notes: "Equinox luxury gym membership billing",
      type: "expense",
      timestamp: "Aug 22, 2024 • 06:12 PM",
      icon: "fitness_center"
    },
    {
      id: "exp_3",
      title: "Apple Store",
      category: "Shopping & Tech",
      amount: 24900.00,
      date: "2024-08-19",
      notes: "Magic Keyboard and accessories purchase",
      type: "expense",
      timestamp: "Aug 19, 2024 • 02:30 PM",
      icon: "laptop_mac"
    },
    {
      id: "exp_4",
      title: "Starbucks Coffee",
      category: "Food & Dining",
      amount: 420.00,
      date: "2024-08-18",
      notes: "Meeting with co-founders",
      type: "expense",
      timestamp: "Aug 18, 2024 • 09:15 AM",
      icon: "coffee"
    },
    {
      id: "exp_5",
      title: "Internal Transfer",
      category: "Others",
      amount: 15000.00,
      date: "2024-08-15",
      notes: "Liquidity shift from secondary holding",
      type: "income",
      timestamp: "Aug 15, 2024 • 04:45 PM",
      icon: "account_balance"
    },
    {
      id: "exp_6",
      title: "Adobe Creative Cloud",
      category: "Shopping & Tech",
      amount: 4230.00,
      date: "2024-08-12",
      notes: "Adobe CC annual team subscription pro-rata",
      type: "expense",
      timestamp: "Aug 12, 2024 • 11:00 AM",
      icon: "palette"
    },
    {
      id: "exp_7",
      title: "AWS Cloud Services",
      category: "Shopping & Tech",
      amount: 1420.00,
      date: "2024-05-28",
      notes: "Database and API cluster infrastructure billing",
      type: "expense",
      timestamp: "May 28, 2024 • 12:00 AM",
      icon: "cloud"
    },
    {
      id: "exp_8",
      title: "Bloomberg Terminal",
      category: "Shopping & Tech",
      amount: 2000.00,
      date: "2024-06-15",
      notes: "Market intelligence subscription pro-rata",
      type: "expense",
      timestamp: "June 15, 2024 • 09:00 AM",
      icon: "workspace_premium"
    },
    {
      id: "exp_9",
      title: "Vercel Hosting",
      category: "Shopping & Tech",
      amount: 42.00,
      date: "2026-07-16",
      notes: "Infrastructure setup micro billing",
      type: "expense",
      timestamp: "July 16, 2026 • 11:42 AM",
      icon: "cloud"
    },
    {
      id: "exp_10",
      title: "GitHub Copilot",
      category: "Shopping & Tech",
      amount: 19.99,
      date: "2026-07-16",
      notes: "Subscription",
      type: "expense",
      timestamp: "July 16, 2026 • 07:44 AM",
      icon: "terminal"
    }
  ],
  settings: {
    biometricUnlock: true,
    twoFactorAuth: true,
    currency: "INR",
    region: "India",
    theme: "light",
    notifications: {
      transactions: true,
      securityAlerts: true,
      marketNews: false
    }
  }
};
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not defined");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}
async function startServer() {
  const app = express();
  const PORT = 3000;
  const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/specter";
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      console.log("Database empty. Seeding initial data...");
      await Profile.create(DEFAULT_DB.profile);
      await Settings.create(DEFAULT_DB.settings);
      await Expense.insertMany(DEFAULT_DB.expenses);
      console.log("Seeding complete.");
    }
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
  app.use(express.json({ limit: "20mb" }));
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await Profile.findOne({});
      if (!profile) return res.status(404).json({ error: "Profile not found" });
      res.json(profile);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  app.put("/api/profile", async (req, res) => {
    try {
      const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.json(profile);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  app.get("/api/expenses", async (req, res) => {
    try {
      const expenses = await Expense.find().sort({ createdAt: -1 });
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  app.post("/api/expenses", async (req, res) => {
    try {
      const newExpense = {
        id: "exp_" + Date.now(),
        title: req.body.title || "Unspecified Expense",
        category: req.body.category || "Others",
        amount: Number(req.body.amount) || 0,
        date: req.body.date || new Date().toISOString().split("T")[0],
        notes: req.body.notes || "",
        type: req.body.type || "expense",
        timestamp: req.body.timestamp || new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }).replace(",", " •"),
        icon: req.body.icon || "receipt_long"
      };
      const exp = await Expense.create(newExpense);
      res.status(201).json(exp);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  app.delete("/api/expenses/:id", async (req, res) => {
    try {
      const expenseId = req.params.id;
      const deleted = await Expense.findOneAndDelete({ id: expenseId });
      if (!deleted) {
        return res.status(404).json({ error: "Expense not found" });
      }
      res.json({ success: true, message: "Expense deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await Settings.findOne({});
      if (!settings) return res.status(404).json({ error: "Settings not found" });
      res.json(settings);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  app.put("/api/settings", async (req, res) => {
    try {
      const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.json(settings);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  app.post("/api/expenses/scan", async (req, res) => {
    try {
      const { base64Data, mimeType } = req.body;
      if (!base64Data || !mimeType) {
        return res.status(400).json({ error: "Missing image base64Data or mimeType" });
      }
      const ai = getGeminiClient();
      const imagePart = {
        inlineData: {
          mimeType,
          data: base64Data
        }
      };
      const promptPart = {
        text: `You are Specter AI Intelligence, the elite assistant for high-end luxury banking. 
Analyze this uploaded receipt/bill image and extract the receipt details. 
You must respond with ONLY a clean JSON object containing the following keys:
- "title": a concise string representing the merchant name (e.g. "Vercel", "Starbucks", "Equinox", "Uber")
- "amount": a numeric float representing the total amount in local currency (rupees/dollars etc.) 
- "category": a string which MUST strictly be one of: "Food & Dining", "Travel & Transit", "Shopping & Tech", "Entertainment", "Utilities", "Others"
- "date": a string in "YYYY-MM-DD" format
- "notes": a very brief professional summary of what the transaction was for (max 10 words)
Your response must contain absolutely no markdown backticks, no text wrapping, and no conversational filler - just a parseable JSON object.`
      };
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: { parts: [imagePart, promptPart] }
      });
      const text = response.text || "";
      console.log("Raw Gemini OCR response:", text);
      let jsonStr = text.trim();
      if (jsonStr.startsWith("\`\`\`json")) {
        jsonStr = jsonStr.substring(7, jsonStr.lastIndexOf("\`\`\`")).trim();
      } else if (jsonStr.startsWith("\`\`\`")) {
        jsonStr = jsonStr.substring(3, jsonStr.lastIndexOf("\`\`\`")).trim();
      }
      const scanResult = JSON.parse(jsonStr);
      res.json(scanResult);
    } catch (err: any) {
      console.error("Gemini OCR Scan Error:", err);
      res.status(500).json({
        error: "AI auto-categorization scan failed",
        details: err?.message || err
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Specter Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}
startServer().catch(err => {
  console.error("Failed to start Specter server:", err);
});
