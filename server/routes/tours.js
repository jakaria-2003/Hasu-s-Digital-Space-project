import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET all tours
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = "SELECT * FROM tours";
    const params = [];

    if (search) {
      query += " WHERE (place LIKE ? OR location LIKE ? OR description LIKE ?)";
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    query += " ORDER BY id ASC";

    const [tours] = await pool.query(query, params);
    res.json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get tours",
      error: error.message,
    });
  }
});

// GET single tour
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM tours WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tour with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get tour",
      error: error.message,
    });
  }
});

// POST new tour
router.post("/", async (req, res) => {
  try {
    const {
      place,
      location,
      tour_date,
      image,
      description,
      highlights,
    } = req.body;

    if (!place) {
      return res.status(400).json({
        success: false,
        message: "Place is required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO tours (place, location, tour_date, image, description, highlights)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        place,
        location || "",
        tour_date || "",
        image || "",
        description || "",
        highlights || "",
      ]
    );

    const [newTour] = await pool.query("SELECT * FROM tours WHERE id = ?", [
      result.insertId,
    ]);

    res.status(201).json({
      success: true,
      message: "Tour entry added successfully! ✈️",
      data: newTour[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add tour",
      error: error.message,
    });
  }
});

// PUT update tour
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      place,
      location,
      tour_date,
      image,
      description,
      highlights,
    } = req.body;

    const [existing] = await pool.query("SELECT * FROM tours WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tour with ID ${id} not found`,
      });
    }

    await pool.query(
      `UPDATE tours SET 
        place = COALESCE(?, place),
        location = COALESCE(?, location),
        tour_date = COALESCE(?, tour_date),
        image = COALESCE(?, image),
        description = COALESCE(?, description),
        highlights = COALESCE(?, highlights)
      WHERE id = ?`,
      [
        place !== undefined ? place : null,
        location !== undefined ? location : null,
        tour_date !== undefined ? tour_date : null,
        image !== undefined ? image : null,
        description !== undefined ? description : null,
        highlights !== undefined ? highlights : null,
        id,
      ]
    );

    const [updated] = await pool.query("SELECT * FROM tours WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Tour entry updated! 🗺️",
      data: updated[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update tour",
      error: error.message,
    });
  }
});

// DELETE tour
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query("SELECT * FROM tours WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tour with ID ${id} not found`,
      });
    }

    await pool.query("DELETE FROM tours WHERE id = ?", [id]);

    res.json({
      success: true,
      message: `Tour with ID ${id} deleted successfully! 🗑️`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete tour",
      error: error.message,
    });
  }
});

export default router;
