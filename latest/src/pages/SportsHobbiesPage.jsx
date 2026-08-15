import { useState } from "react";

function SportsHobbiesPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const gamesAndSports = [
    {
      title: "7.5 KM Marathon & Endurance Running 🏃‍♂️",
      category: "Outdoor Athletics & Fitness",
      image: "/lifestyle/marathon.jpg",
      badge: "Marathon Runner",
      badgeClass: "bg-danger-subtle text-danger border border-danger-subtle",
      description:
        "Passionate long-distance runner participating in 7.5 KM endurance marathons. Pushing physical limits, building cardiovascular stamina, resilience, and maintaining peak fitness with fellow runners.",
    },
    {
      title: "8-Ball Pool & Billiards 🎱",
      category: "Precision & Cue Sports",
      image: "/lifestyle/pool.jpg",
      badge: "Cue Sports",
      badgeClass: "bg-primary-subtle text-primary border border-primary-subtle",
      description:
        "Enjoying strategic cue ball control, angles, geometric calculations, and competitive matches on Brunswick pool tables. A test of fine precision, calm nerves, and shot planning.",
    },
    {
      title: "Chess & Tactical Strategy ♟️",
      category: "Mind Sports & Strategy",
      image: "/lifestyle/chess.jpg",
      badge: "Strategic Mind",
      badgeClass: "bg-dark-subtle text-dark border border-dark-subtle",
      description:
        "Deep focus, position analysis, opening maneuvers, and tactical sacrifices on the 64 squares. Chess is my favorite brain workout that sharpens problem-solving and algorithmic thinking.",
    },
  ];

  const hobbies = [
    {
      title: "Traditional Net Fishing (মাছ ধরা) 🎣",
      category: "Outdoor & Nature Hobby",
      image: "/lifestyle/fishing.jpg",
      description:
        "A peaceful, rewarding traditional pastime of casting hand-thrown fishing nets in village ponds and freshwater rivers. Teaches patience, balance, technique, and deep harmony with nature.",
      icon: "🎣",
      hasImage: true,
    },
    {
      title: "Landscape & Travel Photography 📸",
      category: "Creative Arts",
      description:
        "Capturing scenic beauty across Bangladesh — from the rolling hills of Sajek Valley to the tea gardens of Sylhet and the shores of Cox's Bazar.",
      icon: "📷",
      hasImage: false,
    },
    {
      title: "Air Rover Scouting & Leadership ⚜️",
      category: "Community & Leadership",
      description:
        "Certified Scout Leader in DIU Air Rover Scout Group (Bangladesh Scouts). Active in survival bootcamps, physical agility, and community leadership.",
      icon: "🏕️",
      hasImage: false,
    },
    {
      title: "Book Reading & Literature 📚",
      category: "Intellectual Pursuits",
      description:
        "Immersing in classic Bengali literature, thriller novels, philosophy, and software architecture books.",
      icon: "📖",
      hasImage: false,
    },
    {
      title: "AI & Tech Exploration 🤖",
      category: "Engineering & Innovation",
      description:
        "Experimenting with Data Science models, Machine Learning pipelines, full-stack web platforms, and open-source tech.",
      icon: "💻",
      hasImage: false,
    },
  ];

  return (
    <div className="sports-hobbies-page container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Sports, Games & Hobbies 🎱♟️🏃‍♂️</h1>
        <p className="text-muted">
          Marathon running, 8-ball pool, chess, traditional fishing, scouting, and creative passions
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Sports & Games with Real Photos */}
      <div className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3 className="fw-bold mb-1">🏃‍♂️ Sports & Strategy Games</h3>
            <p className="text-muted small mb-0">Athletics, competitive pool, and tactical chess matches</p>
          </div>
        </div>

        <div className="row g-4">
          {gamesAndSports.map((item, idx) => (
            <div className="col-lg-4 col-md-6" key={idx}>
              <div className="card h-100 shadow-sm border-0 overflow-hidden hover-shadow d-flex flex-column justify-content-between">
                <div>
                  <div
                    className="position-relative cursor-pointer bg-dark"
                    style={{ height: "240px", cursor: "pointer", overflow: "hidden" }}
                    onClick={() => setSelectedImage(item.image)}
                    title="Click to view full image"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover", objectPosition: "center 25%" }}
                    />
                    <span className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 small rounded-start opacity-75">
                      🔍 Zoom
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className={`badge ${item.badgeClass}`}>{item.badge}</span>
                      <span className="text-muted small">{item.category}</span>
                    </div>

                    <h4 className="fw-bold card-title text-dark mb-2">{item.title}</h4>
                    <p className="card-text text-secondary small lh-base mb-0">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies Section featuring Traditional Fishing */}
      <div>
        <div className="mb-4">
          <h3 className="fw-bold mb-1">🎣 Hobbies & Personal Passions</h3>
          <p className="text-muted small mb-0">Traditional fishing, photography, literature, and technology</p>
        </div>

        <div className="row g-4">
          {/* Traditional Fishing Highlight Card */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0 overflow-hidden hover-shadow">
              <div
                className="position-relative cursor-pointer bg-dark"
                style={{ height: "240px", cursor: "pointer", overflow: "hidden" }}
                onClick={() => setSelectedImage("/lifestyle/fishing.jpg")}
                title="Click to view full image"
              >
                <img
                  src="/lifestyle/fishing.jpg"
                  alt="Traditional Fishing"
                  className="w-100 h-100"
                  style={{ objectFit: "cover", objectPosition: "center 35%" }}
                />
                <span className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 small rounded-start opacity-75">
                  🔍 Zoom
                </span>
              </div>

              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-success-subtle text-success border border-success-subtle">
                    Traditional Hobby
                  </span>
                  <span className="text-muted small">Outdoor & Nature</span>
                </div>
                <h4 className="fw-bold card-title text-dark mb-2">Traditional Net Fishing (মাছ ধরা) 🎣</h4>
                <p className="card-text text-secondary small lh-base mb-0">
                  A peaceful, rewarding traditional pastime of casting hand-thrown fishing nets in village ponds and freshwater rivers. Teaches patience, balance, technique, and deep harmony with nature.
                </p>
              </div>
            </div>
          </div>

          {/* Other Hobbies List */}
          <div className="col-lg-6">
            <div className="row g-3 h-100">
              {hobbies
                .filter((h) => !h.hasImage)
                .map((hobby, idx) => (
                  <div className="col-12" key={idx}>
                    <div className="card shadow-sm border-0 p-3 h-100 hover-shadow bg-light">
                      <div className="d-flex align-items-start gap-3">
                        <span className="fs-2">{hobby.icon}</span>
                        <div>
                          <h5 className="fw-bold mb-1 text-dark">{hobby.title}</h5>
                          <span className="badge bg-white text-secondary border small mb-2">
                            {hobby.category}
                          </span>
                          <p className="card-text text-secondary small mb-0 lh-sm">
                            {hobby.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal for Full View */}
      {selectedImage && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1055 }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-transparent border-0 text-center">
              <div className="modal-body p-0 position-relative">
                <button
                  type="button"
                  className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
                <img
                  src={selectedImage}
                  alt="Lifestyle Full"
                  className="img-fluid rounded-3 shadow-lg"
                  style={{ maxHeight: "85vh", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SportsHobbiesPage;
