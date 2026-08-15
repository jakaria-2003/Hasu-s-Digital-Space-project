import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET all skills
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let query = "SELECT * FROM skills";
    const params = [];

    if (category) {
      query += " WHERE category = ?";
      params.push(category);
    }

    query += " ORDER BY proficiency DESC";

    const [skills] = await pool.query(query, params);
    res.json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get skills",
      error: error.message,
    });
  }
});

// GET single skill
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM skills WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Skill with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get skill",
      error: error.message,
    });
  }
});

// POST new skill
router.post("/", async (req, res) => {
  try {
    const { name, category, proficiency, icon } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO skills (name, category, proficiency, icon)
      VALUES (?, ?, ?, ?)`,
      [
        name,
        category || "Technical",
        proficiency !== undefined ? proficiency : 80,
        icon || "",
      ]
    );

    const [newSkill] = await pool.query(
      "SELECT * FROM skills WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Skill added successfully! ⚡",
      data: newSkill[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add skill",
      error: error.message,
    });
  }
});

// PUT update skill
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, proficiency, icon } = req.body;

    const [existing] = await pool.query("SELECT * FROM skills WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Skill with ID ${id} not found`,
      });
    }

    await pool.query(
      `UPDATE skills SET 
        name = COALESCE(?, name),
        category = COALESCE(?, category),
        proficiency = COALESCE(?, proficiency),
        icon = COALESCE(?, icon)
      WHERE id = ?`,
      [
        name !== undefined ? name : null,
        category !== undefined ? category : null,
        proficiency !== undefined ? proficiency : null,
        icon !== undefined ? icon : null,
        id,
      ]
    );

    const [updated] = await pool.query("SELECT * FROM skills WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Skill updated successfully! 🛠️",
      data: updated[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update skill",
      error: error.message,
    });
  }
});

// DELETE skill
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query("SELECT * FROM skills WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Skill with ID ${id} not found`,
      });
    }

    await pool.query("DELETE FROM skills WHERE id = ?", [id]);

    res.json({
      success: true,
      message: `Skill with ID ${id} deleted successfully! 🗑️`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: error.message,
    });
  }
});

export default router;
