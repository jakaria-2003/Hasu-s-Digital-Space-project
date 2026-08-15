import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  try {
    const { search, featured } = req.query;
    let query = "SELECT * FROM projects";
    const params = [];
    const conditions = [];

    if (search) {
      conditions.push("(title LIKE ? OR description LIKE ? OR technologies LIKE ?)");
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (featured !== undefined) {
      conditions.push("featured = ?");
      params.push(featured === "true" || featured === "1" ? 1 : 0);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY id DESC";

    const [projects] = await pool.query(query, params);
    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get projects",
      error: error.message,
    });
  }
});

// GET single project by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get project",
      error: error.message,
    });
  }
});

// POST a new project
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      image,
      github_link,
      live_link,
      featured,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required for project",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO projects 
      (title, description, technologies, image, github_link, live_link, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || "",
        technologies || "",
        image || "",
        github_link || "",
        live_link || "",
        featured ? 1 : 0,
      ]
    );

    const [newProject] = await pool.query(
      "SELECT * FROM projects WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully! 🎉",
      data: newProject[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
});

// PUT / Update project
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      technologies,
      image,
      github_link,
      live_link,
      featured,
    } = req.body;

    const [existing] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found`,
      });
    }

    await pool.query(
      `UPDATE projects SET 
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        technologies = COALESCE(?, technologies),
        image = COALESCE(?, image),
        github_link = COALESCE(?, github_link),
        live_link = COALESCE(?, live_link),
        featured = COALESCE(?, featured)
      WHERE id = ?`,
      [
        title !== undefined ? title : null,
        description !== undefined ? description : null,
        technologies !== undefined ? technologies : null,
        image !== undefined ? image : null,
        github_link !== undefined ? github_link : null,
        live_link !== undefined ? live_link : null,
        featured !== undefined ? (featured ? 1 : 0) : null,
        id,
      ]
    );

    const [updated] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Project updated successfully! ✨",
      data: updated[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
});

// DELETE project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found`,
      });
    }

    await pool.query("DELETE FROM projects WHERE id = ?", [id]);

    res.json({
      success: true,
      message: `Project with ID ${id} deleted successfully! 🗑️`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
});

export default router;