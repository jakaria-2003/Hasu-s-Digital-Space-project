import express from "express";
import pool from "../config/db.js";

const router = express.Router();

function parseUserAgent(ua = "") {
  let device = "Desktop 💻";
  let os = "Windows";
  let browser = "Chrome";

  if (/mobile/i.test(ua)) device = "Mobile 📱";
  else if (/tablet|ipad/i.test(ua)) device = "Tablet 📟";
  else device = "Desktop 💻";

  if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/windows/i.test(ua)) os = "Windows";
  else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";

  if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua)) browser = "Safari";
  else if (/opera|opr/i.test(ua)) browser = "Opera";
  else if (/samsungbrowser/i.test(ua)) browser = "Samsung Browser";

  return { device, os, browser };
}

// POST /api/track - Record a visitor page view
router.post("/", async (req, res) => {
  try {
    const { page = "/", referrer = "" } = req.body || {};
    const rawIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      req.socket?.remoteAddress ||
      "127.0.0.1";

    const city = req.headers["x-vercel-ip-city"] || "Dhaka";
    const country = req.headers["x-vercel-ip-country"] || "Bangladesh";
    const ua = req.headers["user-agent"] || "";
    const { device, os, browser } = parseUserAgent(ua);

    // Ensure table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(100),
        city VARCHAR(100),
        country VARCHAR(100),
        device VARCHAR(100),
        browser VARCHAR(100),
        os VARCHAR(100),
        page VARCHAR(255),
        referrer VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(
      `INSERT INTO page_views (ip_address, city, country, device, browser, os, page, referrer)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [rawIp, city, country, device, browser, os, page.slice(0, 255), referrer.slice(0, 500)]
    );

    const [[{ total }]] = await pool.query("SELECT COUNT(*) as total FROM page_views");
    const [[{ uniqueVis }]] = await pool.query("SELECT COUNT(DISTINCT ip_address) as uniqueVis FROM page_views");

    return res.status(201).json({
      success: true,
      totalViews: total,
      uniqueVisitors: uniqueVis,
    });
  } catch (error) {
    console.error("Track Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/track - Get analytics metrics
router.get("/", async (req, res) => {
  try {
    // Ensure table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(100),
        city VARCHAR(100),
        country VARCHAR(100),
        device VARCHAR(100),
        browser VARCHAR(100),
        os VARCHAR(100),
        page VARCHAR(255),
        referrer VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Total page views
    const [[{ totalViews }]] = await pool.query("SELECT COUNT(*) as totalViews FROM page_views");
    // Unique visitors
    const [[{ uniqueVisitors }]] = await pool.query(
      "SELECT COUNT(DISTINCT ip_address) as uniqueVisitors FROM page_views"
    );
    // Today views
    const [[{ todayViews }]] = await pool.query(
      "SELECT COUNT(*) as todayViews FROM page_views WHERE DATE(created_at) = CURDATE()"
    );

    // Top Pages
    const [topPages] = await pool.query(`
      SELECT page, COUNT(*) as views 
      FROM page_views 
      GROUP BY page 
      ORDER BY views DESC 
      LIMIT 6
    `);

    // Top Locations
    const [topLocations] = await pool.query(`
      SELECT city, country, COUNT(*) as count 
      FROM page_views 
      GROUP BY city, country 
      ORDER BY count DESC 
      LIMIT 6
    `);

    // Device Breakdown
    const [deviceStats] = await pool.query(`
      SELECT device, COUNT(*) as count 
      FROM page_views 
      GROUP BY device 
      ORDER BY count DESC
    `);

    // Recent 30 Visits Log
    const [recentVisits] = await pool.query(`
      SELECT id, ip_address, city, country, device, browser, os, page, referrer, created_at 
      FROM page_views 
      ORDER BY created_at DESC 
      LIMIT 30
    `);

    return res.status(200).json({
      success: true,
      data: {
        totalViews: totalViews || 0,
        uniqueVisitors: uniqueVisitors || 0,
        todayViews: todayViews || 0,
        topPages: topPages || [],
        topLocations: topLocations || [],
        deviceStats: deviceStats || [],
        recentVisits: recentVisits || [],
      },
    });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
