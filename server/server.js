import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import { initDatabase } from "./config/initDb.js";

// Import Route Handlers
import projectRoutes from "./routes/projects.js";
import bookRoutes from "./routes/books.js";
import certificateRoutes from "./routes/certificates.js";
import contactRoutes from "./routes/contacts.js";
import tourRoutes from "./routes/tours.js";
import skillRoutes from "./routes/skills.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root / Welcome & API Index
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Welcome to Hasu's Digital Space Backend API Server",
    author: "Abu Jakaria Hasu",
    status: "online",
    endpoints: {
      health: "/api/health",
      test_db: "/api/test-db",
      projects: "/api/projects",
      books: "/api/books",
      certificates: "/api/certificates",
      contacts: "/api/contacts",
      tours: "/api/tours",
      skills: "/api/skills",
    },
  });
});

// Health check endpoint
app.get("/api/health", async (req, res) => {
  let dbStatus = "disconnected";
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    if (rows && rows[0].result === 2) {
      dbStatus = "connected";
    }
  } catch (err) {
    dbStatus = `error: ${err.message}`;
  }

  res.json({
    success: true,
    server: "running",
    database: dbStatus,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
  });
});

// Test DB Endpoint
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({
      success: true,
      message: "Database Connected Successfully! 🎉",
      result: rows[0].result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database Connection Failed",
      error: error.message,
    });
  }
});

// API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/skills", skillRoutes);

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint '${req.originalUrl}' not found on this server.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

// Initialize Database & Start Server
async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`===========================================`);
    console.log(`  Hasu's Digital Space Server is Running! `);
    console.log(`  Local URL: http://localhost:${PORT}      `);
    console.log(`  Health API: http://localhost:${PORT}/api/health`);
    console.log(`===========================================`);
  });
}

startServer();