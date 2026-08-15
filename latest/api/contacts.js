import pool from "./db.js";

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const { name, email, subject, message } = req.body || {};

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: "Name, email, and message are required fields.",
        });
      }

      // Ensure contacts table exists
      await pool.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(255),
          message TEXT NOT NULL,
          is_read BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const [result] = await pool.query(
        "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
        [name.trim(), email.trim(), (subject || "").trim(), message.trim()]
      );

      return res.status(201).json({
        success: true,
        message: "Message sent successfully! Thank you for reaching out to Hasu.",
        data: {
          id: result.insertId,
          name,
          email,
          subject,
        },
      });
    } catch (error) {
      console.error("Vercel Serverless Contact API Error:", error);
      return res.status(500).json({
        success: false,
        error: "Database error saving message: " + error.message,
      });
    }
  }

  if (req.method === "GET") {
    try {
      const [rows] = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");
      return res.status(200).json({
        success: true,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
