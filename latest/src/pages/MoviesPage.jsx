import { useState } from "react";

function MoviesPage() {
  const [filterGenre, setFilterGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const movies = [
    {
      id: 1,
      title: "মনপুরা (Monpura)",
      year: "2009",
      genre: "Bengali Classic",
      subGenre: "Romance / Folk Drama",
      director: "Giasuddin Selim",
      rating: "⭐ 8.2/10",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80",
      description:
        "একটি কালজয়ী বাংলা ট্র্যাজিক প্রেমের সিনেমা। নির্জন নিঝুম দ্বীপে নির্বাসিত সোনাই এবং পরীর অমর ও অশ্রুসজল ভালোবাসার গ্রামীণ লোকগাথা।",
      quote: "যাও পাখি বলো তারে, সে যেন ভুলে না মোরে...",
    },
    {
      id: 2,
      title: "দীপু নাম্বার টু (Dipu Number Two)",
      year: "1996",
      genre: "Bengali Classic",
      subGenre: "Adventure / Coming of Age",
      director: "Morshedul Islam (Author: Muhammed Zafar Iqbal)",
      rating: "⭐ 8.5/10",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80",
      description:
        "মুহম্মদ জাফর ইকবালের উপন্যাস অবলম্বনে স্কুলজীবনের রোমাঞ্চকর বন্ধুত্ব, কিশোর সাহসিকতা এবং প্রাচীন মূর্তি চোরদের বিরুদ্ধে দীপু ও তার সহপাঠীদের অবিস্মরণীয় অভিযান।",
      quote: "সত্য ও সাহসের বন্ধুত্ব কখনো পরাজিত হয় না।",
    },
    {
      id: 3,
      title: "12th Fail",
      year: "2023",
      genre: "Inspirational",
      subGenre: "Biography / Drama / Struggle",
      director: "Vidhu Vinod Chopra",
      rating: "⭐ 8.8/10",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
      description:
        "চরম দারিদ্র্য, বারবার ব্যর্থতা এবং সমাজের উপহাসকে জয় করে আইপিএস অফিসার মনোজ শর্মার অপ্রতিরোধ্য সংগ্রাম ও স্বপ্নজয়ের বাস্তব অনুপ্রেরণাদায়ী মাস্টারপিস।",
      quote: "হার মানার আগে আরও একবার চেষ্টা করো (#Restart)!",
    },
    {
      id: 4,
      title: "3 Idiots",
      year: "2009",
      genre: "Inspirational",
      subGenre: "Comedy / Drama / Engineering",
      director: "Rajkumar Hirani",
      rating: "⭐ 8.4/10",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
      description:
        "ইঞ্জিনিয়ারিং কলেজের বন্ধুত্ব ও প্রথাগত মুখস্থ শিক্ষার বিরুদ্ধে মেধা, আত্মবিশ্বাস ও স্বপ্নের জয়ের চিরন্তন অনুপ্রেরণাদায়ী সিনেমা।",
      quote: "Pursue excellence, and success will chase you with pants down!",
    },
    {
      id: 5,
      title: "Zindagi Na Milegi Dobara (ZNMD)",
      year: "2011",
      genre: "Drama & Emotion",
      subGenre: "Adventure / Friendship / Life",
      director: "Zoya Akhtar",
      rating: "⭐ 8.2/10",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80",
      description:
        "স্পেনের মনোরম রাস্তায় তিন ঘনিষ্ঠ বন্ধুর রোড ট্রিপ, মনের লুকানো ভয়কে জয় করা এবং প্রতিটি মুহূর্তকে প্রাণভরে উপভোগ করতে শেখার মনোমুগ্ধকর যাত্রা।",
      quote: "Dilon mein tum apni betabiyan leke chal rahe ho toh zinda ho tum!",
    },
    {
      id: 6,
      title: "'96",
      year: "2018",
      genre: "Romance",
      subGenre: "Nostalgia / Pure Love / Drama",
      director: "C. Prem Kumar",
      rating: "⭐ 8.5/10",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
      description:
        "২২ বছর পর ব্যাচ রিইউনিয়নে স্কুলজীবনের দুই প্রেমিক রাম ও জানুর এক রাতের পুনর্মিলন। নিঃশব্দ প্রেম ও নস্টালজিয়ার হৃদস্পর্শী কাব্যিক উপাখ্যান।",
      quote: "কিছু ভালোবাসা কোনোদিন পাওয়ার জন্য নয়, শুধু মনে রাখার জন্যই বেঁচে থাকে।",
    },
    {
      id: 7,
      title: "দেবদাস (Devdas)",
      year: "2002",
      genre: "Romance",
      subGenre: "Tragedy / Classic / Drama",
      director: "Sanjay Leela Bhansali",
      rating: "⭐ 7.5/10",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
      description:
        "শরৎচন্দ্র চট্টোপাধ্যায়ের অমর উপন্যাস অবলম্বনে নির্মিত মহাকাব্যিক ট্র্যাজেডি। গভীর ভালোবাসা, অহংকার এবং আত্মধ্বংসের অশ্রুসজল উপাখ্যান।",
      quote: "বাবুজি নে কহা গাঁও ছোড় দো, সবনে কহা পারো কো ছোড় দো...",
    },
    {
      id: 8,
      title: "Aashiqui 2",
      year: "2013",
      genre: "Romance",
      subGenre: "Musical Romance / Tragedy",
      director: "Mohit Suri",
      rating: "⭐ 7.1/10",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
      description:
        "সঙ্গীতের সুরে জড়ানো রাহুল ও আরোহীর আত্মত্যাগময় অমর প্রেম। সুর, ভালোবাসা এবং আত্মবিসর্জনের হৃদয়বিদারক গল্প।",
      quote: "তুম হি হো, অব তুম হি হো, জিন্দেগি অব তুম হি হো...",
    },
    {
      id: 9,
      title: "Spider-Man",
      year: "2002",
      genre: "Superhero & Sci-Fi",
      subGenre: "Action / Superhero / Origin",
      director: "Sam Raimi",
      rating: "⭐ 7.4/10",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80",
      description:
        "সাধারণ স্কুলছাত্র পিটার পার্কারের সুপারহিরো স্পাইডার-ম্যান হয়ে ওঠার ক্লাসিক সূচনা এবং দায়িত্ববোধের প্রথম শিক্ষা।",
      quote: "With great power comes great responsibility.",
    },
    {
      id: 10,
      title: "Spider-Man 2",
      year: "2004",
      genre: "Superhero & Sci-Fi",
      subGenre: "Action / Heroism / Sci-Fi",
      director: "Sam Raimi",
      rating: "⭐ 7.5/10",
      image: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=600&auto=format&fit=crop&q=80",
      description:
        "নিজের ব্যক্তিগত সুখ ও শহরের সুরক্ষার মধ্যে পিটার পার্কারের অভ্যন্তরীণ দ্বন্দ্ব এবং ডক্টর অক্টোপাসের বিরুদ্ধে লড়াইয়ের সর্বকালের অন্যতম সেরা সুপারহিরো মুভি।",
      quote: "Sometimes, to do what's right, we have to give up the thing we want the most.",
    },
  ];

  const genres = [
    "All",
    "Bengali Classic",
    "Inspirational",
    "Romance",
    "Drama & Emotion",
    "Superhero & Sci-Fi",
  ];

  const filteredMovies = movies.filter((m) => {
    const matchesGenre = filterGenre === "All" || m.genre === filterGenre;
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subGenre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="movies-page container py-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5">🎬 Cinema Lounge & Favorite Movies</h1>
        <p className="text-muted">
          My all-time favorite Bengali classics, inspiring life journeys, romantic epics, and superhero cinema
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
              placeholder="Search movies by title, director, or keyword..."
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

      {/* Genre Filter Pills */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        {genres.map((g, idx) => (
          <button
            key={idx}
            className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${
              filterGenre === g ? "btn-dark shadow-sm" : "btn-outline-secondary"
            }`}
            onClick={() => setFilterGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-center my-5 text-muted">
          <h4>No movies found</h4>
          <p>Try searching for a different movie title or clear filter.</p>
        </div>
      )}

      {/* Movies Cards Grid */}
      <div className="row g-4">
        {filteredMovies.map((movie) => (
          <div className="col-md-6 col-lg-4" key={movie.id}>
            <div className="card h-100 shadow-sm border-0 overflow-hidden hover-shadow d-flex flex-column justify-content-between">
              <div>
                <div className="position-relative" style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <span className="position-absolute top-0 end-0 bg-dark text-white px-3 py-1 m-2 rounded-pill small fw-bold shadow">
                    {movie.rating}
                  </span>
                  <span className="position-absolute bottom-0 start-0 bg-primary text-white px-2 py-1 m-2 rounded small fw-semibold">
                    {movie.genre}
                  </span>
                </div>

                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h4 className="fw-bold card-title mb-0 text-dark">{movie.title}</h4>
                    <span className="badge bg-light text-dark border">
                      {movie.year}
                    </span>
                  </div>

                  <p className="text-primary small fw-semibold mb-2">
                    {movie.subGenre}
                  </p>

                  <p className="text-muted small mb-2">
                    🎬 <strong>Director:</strong> {movie.director}
                  </p>

                  <p className="card-text text-secondary small lh-base mb-3">
                    {movie.description}
                  </p>

                  {movie.quote && (
                    <blockquote className="blockquote text-muted fst-italic small border-start border-3 border-primary ps-3 my-2">
                      "{movie.quote}"
                    </blockquote>
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

export default MoviesPage;
