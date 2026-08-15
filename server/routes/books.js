import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET all books
router.get("/", async (req, res) => {
  try {
    const { status, category, search } = req.query;
    let query = "SELECT * FROM books";
    const params = [];
    const conditions = [];

    if (status) {
      conditions.push("status = ?");
      params.push(status);
    }
    if (category) {
      conditions.push("category LIKE ?");
      params.push(`%${category}%`);
    }
    if (search) {
      conditions.push("(title LIKE ? OR author LIKE ?)");
      const term = `%${search}%`;
      params.push(term, term);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY id DESC";

    const [books] = await pool.query(query, params);
    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get books",
      error: error.message,
    });
  }
});

// GET single book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Book with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get book",
      error: error.message,
    });
  }
});

// POST a new book
router.post("/", async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      status,
      rating,
      notes,
      cover_image,
      read_date,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Book title is required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO books 
      (title, author, category, status, rating, notes, cover_image, read_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        author || "Unknown",
        category || "General",
        status || "completed",
        rating || 5,
        notes || "",
        cover_image || "",
        read_date || "",
      ]
    );

    const [newBook] = await pool.query("SELECT * FROM books WHERE id = ?", [
      result.insertId,
    ]);

    res.status(201).json({
      success: true,
      message: "Book added to library! 📚",
      data: newBook[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add book",
      error: error.message,
    });
  }
});

// PUT update book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      category,
      status,
      rating,
      notes,
      cover_image,
      read_date,
    } = req.body;

    const [existing] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Book with ID ${id} not found`,
      });
    }

    await pool.query(
      `UPDATE books SET 
        title = COALESCE(?, title),
        author = COALESCE(?, author),
        category = COALESCE(?, category),
        status = COALESCE(?, status),
        rating = COALESCE(?, rating),
        notes = COALESCE(?, notes),
        cover_image = COALESCE(?, cover_image),
        read_date = COALESCE(?, read_date)
      WHERE id = ?`,
      [
        title !== undefined ? title : null,
        author !== undefined ? author : null,
        category !== undefined ? category : null,
        status !== undefined ? status : null,
        rating !== undefined ? rating : null,
        notes !== undefined ? notes : null,
        cover_image !== undefined ? cover_image : null,
        read_date !== undefined ? read_date : null,
        id,
      ]
    );

    const [updated] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Book updated successfully! 📖",
      data: updated[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
});

// DELETE book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Book with ID ${id} not found`,
      });
    }

    await pool.query("DELETE FROM books WHERE id = ?", [id]);

    res.json({
      success: true,
      message: `Book with ID ${id} deleted successfully! 🗑️`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
});

export default router;
