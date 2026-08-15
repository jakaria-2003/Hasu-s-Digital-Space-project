import { useState, useEffect } from "react";
import { API_URL } from "../../config/api.js";

function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="container py-5" id="library">
      <div className="text-center">
        <h2 className="fw-bold">My Library</h2>
        <hr className="w-25 mx-auto" />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      <ul className="list-group mt-4 shadow-sm">
        {books.map((book) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center py-3"
            key={book.id}
          >
            <div>
              <span className="fw-semibold">📖 {book.title}</span>
              {book.author && (
                <span className="text-muted ms-2">— by {book.author}</span>
              )}
            </div>
            <div>
              {book.category && (
                <span className="badge bg-light text-dark border me-2">
                  {book.category}
                </span>
              )}
              <span className="badge bg-success">
                {book.status === "completed" ? "Read" : book.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Library;