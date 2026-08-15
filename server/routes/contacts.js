import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET all contact submissions (Admin view)
router.get("/", async (req, res) => {
  try {
    const { unread_only } = req.query;
    let query = "SELECT * FROM contacts";
    const params = [];

    if (unread_only === "true" || unread_only === "1") {
      query += " WHERE is_read = 0";
    }

    query += " ORDER BY id DESC";

    const [contacts] = await pool.query(query, params);
    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get contact messages",
      error: error.message,
    });
  }
});

// GET single message by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM contacts WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Contact message with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get contact message",
      error: error.message,
    });
  }
});

// POST new contact message (Public form submission)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields",
      });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO contacts (name, email, subject, message)
      VALUES (?, ?, ?, ?)`,
      [name.trim(), email.trim(), subject ? subject.trim() : "Portfolio Contact", message.trim()]
    );

    const [newMessage] = await pool.query(
      "SELECT * FROM contacts WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent successfully. 📬",
      data: newMessage[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
});

// PATCH mark as read / unread
router.patch("/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;

    const [existing] = await pool.query("SELECT * FROM contacts WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Contact message with ID ${id} not found`,
      });
    }

    const newStatus = is_read !== undefined ? (is_read ? 1 : 0) : (existing[0].is_read ? 0 : 1);
    await pool.query("UPDATE contacts SET is_read = ? WHERE id = ?", [newStatus, id]);

    res.json({
      success: true,
      message: `Message marked as ${newStatus === 1 ? "read" : "unread"}`,
      is_read: newStatus === 1,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update message status",
      error: error.message,
    });
  }
});

// DELETE contact message
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query("SELECT * FROM contacts WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Contact message with ID ${id} not found`,
      });
    }

    await pool.query("DELETE FROM contacts WHERE id = ?", [id]);

    res.json({
      success: true,
      message: `Contact message with ID ${id} deleted successfully! 🗑️`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete contact message",
      error: error.message,
    });
  }
});

export default router;
