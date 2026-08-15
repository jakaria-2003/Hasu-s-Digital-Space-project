import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET all certificates
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = "SELECT * FROM certificates";
    const params = [];

    if (search) {
      query += " WHERE (title LIKE ? OR issuer LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    query += " ORDER BY id DESC";

    const [certificates] = await pool.query(query, params);
    res.json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get certificates",
      error: error.message,
    });
  }
});

// GET single certificate
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM certificates WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Certificate with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get certificate",
      error: error.message,
    });
  }
});

// POST new certificate
router.post("/", async (req, res) => {
  try {
    const {
      title,
      issuer,
      issue_date,
      credential_url,
      image,
      description,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Certificate title is required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO certificates 
      (title, issuer, issue_date, credential_url, image, description)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        issuer || "",
        issue_date || "",
        credential_url || "",
        image || "",
        description || "",
      ]
    );

    const [newCert] = await pool.query(
      "SELECT * FROM certificates WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Certificate added successfully! 🏆",
      data: newCert[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add certificate",
      error: error.message,
    });
  }
});

// PUT update certificate
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      issuer,
      issue_date,
      credential_url,
      image,
      description,
    } = req.body;

    const [existing] = await pool.query(
      "SELECT * FROM certificates WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Certificate with ID ${id} not found`,
      });
    }

    await pool.query(
      `UPDATE certificates SET 
        title = COALESCE(?, title),
        issuer = COALESCE(?, issuer),
        issue_date = COALESCE(?, issue_date),
        credential_url = COALESCE(?, credential_url),
        image = COALESCE(?, image),
        description = COALESCE(?, description)
      WHERE id = ?`,
      [
        title !== undefined ? title : null,
        issuer !== undefined ? issuer : null,
        issue_date !== undefined ? issue_date : null,
        credential_url !== undefined ? credential_url : null,
        image !== undefined ? image : null,
        description !== undefined ? description : null,
        id,
      ]
    );

    const [updated] = await pool.query(
      "SELECT * FROM certificates WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Certificate updated successfully! 🥇",
      data: updated[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update certificate",
      error: error.message,
    });
  }
});

// DELETE certificate
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query(
      "SELECT * FROM certificates WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Certificate with ID ${id} not found`,
      });
    }

    await pool.query("DELETE FROM certificates WHERE id = ?", [id]);

    res.json({
      success: true,
      message: `Certificate with ID ${id} deleted successfully! 🗑️`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete certificate",
      error: error.message,
    });
  }
});

export default router;
