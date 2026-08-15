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

  return (
    <div className="library-page container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5">My Library 📖</h1>
        <p className="text-muted">
          My favorite book collections with online reading & PDF access
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input
              type="text"
              className="form-control border-start-0 py-2"
              placeholder="Search books..."
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
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
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
          <p className="mt-2 text-muted">Loading books from database...</p>
        </div>
      )}

      {!loading && filteredBooks.length === 0 && (
        <div className="text-center my-5 text-muted">
          <h4>No books found</h4>
        </div>
      )}

      {/* Clean List View matching the classic original style with modern action buttons */}
      <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
        <ul className="list-group list-group-flush">
          {filteredBooks.map((book) => (
            <li
              className="list-group-item p-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 hover-bg-light"
              key={book.id}
            >
              <div className="flex-grow-1">
                <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                  <h5 className="fw-bold mb-0 text-dark">
                    📖 {book.title}
                  </h5>
                  {book.category && (
                    <span className="badge bg-light text-dark border">
                      {book.category}
                    </span>
                  )}
                </div>

                <p className="text-muted mb-1 small">
                  Author: <strong className="text-secondary">{book.author || "Unknown"}</strong>
                </p>

                {book.notes && (
                  <p className="text-secondary small mb-0 lh-sm">
                    {book.notes}
                  </p>
                )}
              </div>

              {/* Action Read & PDF buttons */}
              <div className="d-flex align-items-center gap-2 flex-shrink-0">
                {book.read_url && (
                  <a
                    href={book.read_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm px-3 fw-semibold shadow-sm"
                  >
                    Read Online 📖
                  </a>
                )}
                {book.pdf_url && (
                  <a
                    href={book.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark btn-sm px-3 fw-semibold"
                  >
                    View PDF 📄
                  </a>
                )}
                <span className="badge bg-success ms-1">Read</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LibraryPage;
