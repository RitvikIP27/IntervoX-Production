import express from "express";
import path from "path";
import cors from "cors";

// ❌ REMOVE problematic imports for now
// import {ENV} from "./lib/env.js";
import { connectDB } from "./lib/db.js";
// import { inngest, functions } from "./lib/inngest.js";
// import { serve } from "inngest/express";
// import { clerkMiddleware } from '@clerk/express'

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();

console.log("🚀 Starting server...");

// ✅ SAFE ENV (no crash)
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "*";
const NODE_ENV = process.env.NODE_ENV || "development";

const __dirname = path.resolve();

//middlewares
app.use(express.json());

// ✅ SAFE CORS
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// ❌ DISABLE CLERK (for now)
console.log("⚠️ Clerk disabled (dev mode)");

// ❌ DISABLE INNGEST
console.log("⚠️ Inngest disabled (dev mode)");

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

// ✅ JDoodle BYPASS
app.post("/api/run-code", async (req, res) => {
  if (!process.env.JDOODLE_CLIENT_ID) {
    return res.json({
      run: {
        output: "⚠️ Code execution disabled (dev mode)",
        stderr: "",
      },
    });
  }

  res.json({
    run: {
      output: "Execution placeholder",
      stderr: "",
    },
  });
});

// Static (optional)
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// 🔥 SAFE START
const startServer = async () => {
  try {
    console.log("👉 Connecting DB...");

    await connectDB(); // already bypassed

    console.log("👉 Starting server...");

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

// Safety handlers
process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.error("🔥 Rejection:", err?.message || err);
});

startServer();