import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading library books:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(books.map((b) => b.category).filter(Boolean))];

  const filteredBooks =
    filterCategory === "All"
      ? books
      : books.filter((b) => b.category === filterCategory);

  const renderStars = (rating = 5) => {
    return "⭐".repeat(Math.min(5, Math.max(1, rating)));
  };

  return (
    <div className="library-page container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5">My Digital Library 📚</h1>
        <p className="text-muted">Books, reading lists, and tech resources that inspire my journey</p>
        <hr className="w-25 mx-auto" />
      </div>

      {categories.length > 1 && (
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`btn btn-sm rounded-pill px-3 ${
                filterCategory === cat ? "btn-dark shadow-sm" : "btn-outline-secondary"
              }`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Opening library shelves...</p>
        </div>
      )}

      <div className="row g-4">
        {filteredBooks.map((book) => (
          <div className="col-md-6" key={book.id}>
            <div className="card h-100 shadow-sm border-0 p-3">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 className="fw-bold card-title mb-0">📖 {book.title}</h4>
                    <span className="badge bg-success-subtle text-success border border-success-subtle">
                      {book.status === "completed" ? "Read" : book.status}
                    </span>
                  </div>

                  <p className="text-muted mb-2">
                    Author: <span className="fw-semibold text-dark">{book.author || "Unknown"}</span>
                  </p>

                  {book.category && (
                    <div className="mb-2">
                      <span className="badge bg-light text-dark border me-2">
                        {book.category}
                      </span>
                      <span className="small text-warning">{renderStars(book.rating)}</span>
                    </div>
                  )}

                  {book.notes && (
                    <p className="card-text text-secondary small mt-2">{book.notes}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LibraryPage;
