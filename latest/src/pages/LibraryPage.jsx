import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

const DEFAULT_BOOKS = [
  {
    id: 1,
    title: "Sajahan Tonoy (শাহজাহান তন্ময়)",
    author: "শাহজাহান তন্ময় (Shahjahan Tanmoy)",
    category: "Bengali Literature",
    rating: 5,
    notes: "অনুপ্রেরণামূলক ও জনপ্রিয় বাংলা সাহিত্য রচনা।",
    read_url: "https://archive.org/details/books",
    pdf_url: "https://archive.org/details/books",
  },
  {
    id: 2,
    title: "Ma (মা)",
    author: "আনিসুল হক (Anisul Hoque)",
    category: "Liberation War & Novel",
    rating: 5,
    notes: "মুক্তিযুদ্ধের পটভূমিতে রচিত শহীদ জননী সাফিয়া বেগম ও তার বীর সন্তান আজাদের অশ্রুসজল বাস্তব গল্প।",
    read_url: "https://archive.org/details/books",
    pdf_url: "https://archive.org/details/books",
  },
  {
    id: 3,
    title: "Paradoxical Sajid (প্যারাডক্সিক্যাল সাজিদ)",
    author: "আরিফ আজাদ (Arif Azad)",
    category: "Islamic & Logic",
    rating: 5,
    notes: "যুক্তি, বিজ্ঞান ও ধর্মীয় দর্শনের চমৎকার সংমিশ্রণে রচিত সর্বাধিক বিক্রিত জনপ্রিয় বই।",
    read_url: "https://archive.org/details/books",
    pdf_url: "https://archive.org/details/books",
  },
  {
    id: 4,
    title: "Fera (ফেরা)",
    author: "আরিফ আজাদ (Arif Azad)",
    category: "Self Growth & Spirituality",
    rating: 5,
    notes: "জীবনের ভুল পথ থেকে আত্মশুদ্ধি ও আলোর দিকে ফিরে আসার অনুপ্রেরণামূলক গল্পগাথা।",
    read_url: "https://archive.org/details/books",
    pdf_url: "https://archive.org/details/books",
  },
  {
    id: 5,
    title: "Opekkha (অপেক্ষা)",
    author: "হুমায়ূন আহমেদ (Humayun Ahmed)",
    category: "Bengali Classic Novel",
    rating: 5,
    notes: "একটি পরিবারের নিখোঁজ বাবার ফিরে আসার আকুল প্রতীক্ষা ও আবেগময় জীবনকাহিনীর ক্লাসিক উপন্যাস।",
    read_url: "https://archive.org/details/books",
    pdf_url: "https://archive.org/details/books",
  },
  {
    id: 6,
    title: "Devdas (দেবদাস)",
    author: "শরৎচন্দ্র চট্টোপাধ্যায় (Sarat Chandra)",
    category: "Bengali Classic",
    rating: 5,
    notes: "কালজয়ী অমর প্রেমের উপন্যাস। দেবদাস ও পার্বতীর ভালোবাসার ইতিহাস।",
    read_url: "https://en.wikisource.org/wiki/bn:%E0%A6%A6%E0%A7%87%E0%A6%AC%E0%A6%A6%E0%A6%BE%E0%A6%B8",
    pdf_url: "https://archive.org/details/in.ernet.dli.2015.452654",
  },
  {
    id: 7,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    rating: 5,
    notes: "A handbook of agile software craftsmanship and clean programming practices.",
    read_url: "https://archive.org/details/clean-code-9780136083238",
    pdf_url: "https://archive.org/details/clean-code-9780136083238",
  },
  {
    id: 8,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Improvement",
    rating: 5,
    notes: "An easy & proven way to build good habits and break bad ones.",
    read_url: "https://archive.org/details/atomic-habits-pdfdrive",
    pdf_url: "https://archive.org/details/atomic-habits-pdfdrive",
  },
];

function LibraryPage() {
  const [books, setBooks] = useState(DEFAULT_BOOKS);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend offline");
        return res.json();
      })
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setBooks(data.data);
        }
      })
      .catch((err) => {
        // Automatically fallback to embedded books
        console.log("Using default book catalog:", err.message);
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
