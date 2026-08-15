import { useState } from "react";

function MoviesPage() {
  const [filterGenre, setFilterGenre] = useState("All");

  const movies = [
    {
      id: 1,
      title: "Interstellar",
      year: "2014",
      genre: "Sci-Fi / Adventure",
      director: "Christopher Nolan",
      rating: "⭐ 8.7/10",
      image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80",
      description:
        "A breathtaking masterpiece exploring love, human survival, astrophysics, wormholes, and the sheer vastness of space and time.",
      quote: "Love is the one thing we're capable of perceiving that transcends dimensions of time and space.",
    },
    {
      id: 2,
      title: "Inception",
      year: "2010",
      genre: "Sci-Fi / Thriller",
      director: "Christopher Nolan",
      rating: "⭐ 8.8/10",
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80",
      description:
        "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      quote: "An idea is like a virus. Resilient. Highly contagious.",
    },
    {
      id: 3,
      title: "3 Idiots",
      year: "2009",
      genre: "Comedy / Drama / Education",
      director: "Rajkumar Hirani",
      rating: "⭐ 8.4/10",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
      description:
        "The ultimate engineering college classic inspiring true passion, lifelong friendship, and pursuing excellence over mere success.",
      quote: "Pursue excellence, and success will chase you with pants down!",
    },
    {
      id: 4,
      title: "The Shawshank Redemption",
      year: "1994",
      genre: "Drama",
      director: "Frank Darabont",
      rating: "⭐ 9.3/10",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
      description:
        "The highest-rated film of all time depicting the power of unyielding hope, patience, intelligence, and human spirit.",
      quote: "Hope is a good thing, maybe the best of things, and no good thing ever dies.",
    },
    {
      id: 5,
      title: "Oppenheimer",
      year: "2023",
      genre: "Biography / History / Drama",
      director: "Christopher Nolan",
      rating: "⭐ 8.9/10",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      quote: "Now I am become Death, the destroyer of worlds.",
    },
    {
      id: 6,
      title: "Taare Zameen Par (Like Stars on Earth)",
      year: "2007",
      genre: "Drama / Family",
      director: "Aamir Khan",
      rating: "⭐ 8.3/10",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80",
      description:
        "An eight-year-old boy is thought to be a lazy trouble-maker, until the new art teacher discovers the real problem behind his struggles.",
      quote: "Every child has their own special spark and pace.",
    },
  ];

  const genres = ["All", "Sci-Fi", "Drama", "Comedy"];

  const filteredMovies = movies.filter((m) => {
    if (filterGenre === "All") return true;
    return m.genre.includes(filterGenre);
  });

  return (
    <div className="movies-page container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">🎬 Cinema Lounge & Favorite Movies</h1>
        <p className="text-muted">
          Films, mind-bending sci-fi masterpieces, and emotional cinema that inspired my perspective
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Genre Filter */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        {genres.map((g, idx) => (
          <button
            key={idx}
            className={`btn btn-sm rounded-pill px-4 py-1 fw-semibold ${
              filterGenre === g ? "btn-dark shadow-sm" : "btn-outline-secondary"
            }`}
            onClick={() => setFilterGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

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
                </div>

                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="fw-bold card-title mb-0 text-dark">{movie.title}</h4>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                      {movie.year}
                    </span>
                  </div>

                  <p className="text-muted small mb-2">
                    🎭 <strong>{movie.genre}</strong> • Dir: {movie.director}
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
