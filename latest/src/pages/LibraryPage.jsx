import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredBooks = books.filter((book) => {
    const matchesCategory = filterCategory === "All" || book.category === filterCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.notes && book.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const renderStars = (rating = 5) => {
    return "⭐".repeat(Math.min(5, Math.max(1, rating)));
  };

  return (
    <div className="library-page container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5">My Digital Library & Bookshelf 📚</h1>
        <p className="text-muted">
          Classic Bengali literature, computer science books, and inspirational reading collections with online reading access.
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Search & Category Filter */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input
              type="text"
              className="form-control border-start-0 py-2"
              placeholder="Search books by title, author, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      {categories.length > 1 && (
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${
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
          <p className="mt-2 text-muted">Opening digital library shelves...</p>
        </div>
      )}

      {!loading && filteredBooks.length === 0 && (
        <div className="text-center my-5 text-muted">
          <h4>No books found matching your criteria</h4>
          <p>Try searching for a different book or clear filters.</p>
        </div>
      )}

      {/* Books Grid */}
      <div className="row g-4">
        {filteredBooks.map((book) => (
          <div className="col-md-6 col-lg-4" key={book.id}>
            <div className="card h-100 shadow-sm border-0 d-flex flex-column justify-content-between p-3 hover-shadow">
              <div>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                    {book.category || "General"}
                  </span>
                  <span className="small">{renderStars(book.rating)}</span>
                </div>

                <h4 className="fw-bold card-title mb-1 text-dark">
                  📖 {book.title}
                </h4>

                <p className="text-muted small mb-2">
                  Author: <strong className="text-dark">{book.author || "Unknown"}</strong>
                </p>

                {book.notes && (
                  <p className="card-text text-secondary small mt-2 lh-base">
                    {book.notes}
                  </p>
                )}
              </div>

              {/* Action Buttons: Read Online / PDF */}
              <div className="mt-3 pt-3 border-top d-flex gap-2">
                {book.read_url ? (
                  <a
                    href={book.read_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm flex-fill fw-semibold shadow-sm"
                  >
                    📖 Read Online
                  </a>
                ) : (
                  <button className="btn btn-secondary btn-sm flex-fill" disabled>
                    Reading
                  </button>
                )}

                {book.pdf_url && (
                  <a
                    href={book.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark btn-sm flex-fill fw-semibold"
                  >
                    📄 View PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LibraryPage;
