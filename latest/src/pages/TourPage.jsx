import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

const PLACE_DEFAULT_IMAGES = {
  kuakata: "/kuakata.png",
  tangail: "/tangail.jpg",
  mohera: "/tangail.jpg",
  sonargaon: "/sonargaon.png",
  panam: "/sonargaon.png",
  cox: "/abu.jpeg",
  sajek: "/hhp.jpg",
  sylhet: "/sylhet.jpg",
};

const resolveTourImage = (tour) => {
  if (tour && tour.image && tour.image.trim() !== "") {
    return tour.image;
  }
  const placeLower = (tour?.place || "").toLowerCase();
  for (const [key, img] of Object.entries(PLACE_DEFAULT_IMAGES)) {
    if (placeLower.includes(key)) return img;
  }
  return "/abu.jpeg";
};

const parseHighlights = (highlights) => {
  if (!highlights) return [];
  if (Array.isArray(highlights)) return highlights;
  if (typeof highlights === "string") {
    return highlights
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

const DEFAULT_TOURS = [
  {
    id: 1,
    place: "Kuakata Sea Beach",
    location: "Patuakhali, Barishal Division, Bangladesh",
    tour_date: "February 2026",
    category: "Beach",
    image: "/kuakata.png",
    description:
      "Standing on traditional wooden fishing boats on the expansive golden sands of Kuakata, famously celebrated as 'Sagar Kannya' (Daughter of the Ocean) where both sunrise and sunset can be viewed over the Bay of Bengal.",
    highlights: ["Sagar Kannya Beach", "Sunset & Sunrise View", "Traditional Fishing Boats", "Coastal Exploration"],
  },
  {
    id: 2,
    place: "Mohera Zamindar Bari, Tangail",
    location: "Mirzapur, Tangail, Dhaka Division, Bangladesh",
    tour_date: "March 2026",
    category: "Heritage",
    image: "/tangail.jpg",
    description:
      "Exploring the majestic neoclassical Greco-Roman palace grounds, historic royal lodges (Chowdhury Lodge, Ananda Lodge, Maharaj Lodge), manicured gardens, and colonial-era heritage of Mohera Zamindar Bari in Tangail.",
    highlights: ["Chowdhury & Ananda Lodge", "Greco-Roman Architecture", "Historic Zamindar Heritage", "Botanical Gardens"],
  },
  {
    id: 3,
    place: "Panam Nagar & Sonargaon",
    location: "Sonargaon, Narayanganj, Dhaka Division, Bangladesh",
    tour_date: "January 2026",
    category: "Heritage",
    image: "/sonargaon.png",
    description:
      "Stepping back into Bengal's rich medieval history in the ancient capital of Sonargaon, walking through the historic street architecture of Panam Nagar ('The Lost City') and the grand courtyard of Boro Sardar Bari (Folk Art Museum).",
    highlights: ["Panam Nagar Historic City", "Boro Sardar Bari Courtyard", "Folk Art & Craft Museum", "Ancient Bengal Heritage"],
  },
  {
    id: 4,
    place: "Cox's Bazar Sea Beach",
    location: "Cox's Bazar, Chittagong Division, Bangladesh",
    tour_date: "January 2026",
    category: "Beach",
    image: "/abu.jpeg",
    description:
      "Riding ATV beach-buggies along the world's longest unbroken natural sandy sea beach, enjoying golden ocean sunsets, coastal winds, and vibrant beachside adventures.",
    highlights: ["World's Longest Beach", "ATV Beach Riding", "Golden Sunset", "Marine Drive"],
  },
  {
    id: 5,
    place: "Sajek Valley",
    location: "Rangamati, Chittagong Hill Tracts, Bangladesh",
    tour_date: "March 2025",
    category: "Hills",
    image: "/hhp.jpg",
    description:
      "A breathtaking journey through the queen of hills, mist-covered mountain peaks, and floating cloudscapes of Sajek Valley situated high above sea level in the hill tracts.",
    highlights: ["Konglak Peak", "Sea of Clouds", "Helipad Viewpoint", "Hill Tracts Roads"],
  },
  {
    id: 6,
    place: "Sylhet Tea Gardens & Natural Lakes",
    location: "Sylhet Division, Bangladesh",
    tour_date: "May 2026",
    category: "Nature",
    image: "/sylhet.jpg",
    description:
      "Exploring lush undulating emerald tea gardens, crystal-clear freshwater riverbeds, and peaceful rural nature in the northeastern green sanctuary of Sylhet.",
    highlights: ["Emerald Tea Estates", "Freshwater Streams", "Serene Green Hills", "Nature Exploration"],
  },
];

function TourPage() {
  const [tours, setTours] = useState(DEFAULT_TOURS);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/tours`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend offline");
        return res.json();
      })
      .then((data) => {
        if (data.data && data.data.length > 0) {
          // Normalize and format data from API
          const formatted = data.data.map((item) => ({
            ...item,
            image: resolveTourImage(item),
            highlights: parseHighlights(item.highlights),
          }));
          setTours(formatted);
        }
      })
      .catch((err) => {
        console.log("Using default travel catalog:", err.message);
      });
  }, []);

  const categories = [
    { label: "All Destinations", value: "All", icon: "🌍" },
    { label: "Sea Beaches", value: "Beach", icon: "🏖️" },
    { label: "Heritage & Palaces", value: "Heritage", icon: "🏛️" },
    { label: "Hills & Mountains", value: "Hills", icon: "⛰️" },
    { label: "Nature & Greenery", value: "Nature", icon: "🌿" },
  ];

  const filteredTours = tours.filter((tour) => {
    if (selectedFilter === "All") return true;
    const cat =
      tour.category ||
      (tour.place.includes("Beach") || tour.place.includes("Kuakata") || tour.place.includes("Cox")
        ? "Beach"
        : tour.place.includes("Zamindar") || tour.place.includes("Sonargaon") || tour.place.includes("Panam") || tour.place.includes("Tangail")
        ? "Heritage"
        : tour.place.includes("Sajek")
        ? "Hills"
        : "Nature");
    return cat === selectedFilter;
  });

  const openModal = (index) => {
    setActiveModalIndex(index);
  };

  const closeModal = () => {
    setActiveModalIndex(null);
  };

  const nextPhoto = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % filteredTours.length);
    }
  };

  const prevPhoto = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex - 1 + filteredTours.length) % filteredTours.length);
    }
  };

  const activeTour = activeModalIndex !== null ? filteredTours[activeModalIndex] : null;

  return (
    <div className="tour-page container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">🌍 My Travel Diaries & Expeditions</h1>
        <p className="text-muted">
          Exploring historic heritage sites, sea beaches, rolling mountain peaks, and natural beauty across Bangladesh
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Stats Counter */}
      <div className="row g-3 mb-5">
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm p-3 bg-light rounded-4 h-100">
            <span className="fs-2 mb-1">🗺️</span>
            <h4 className="fw-bold text-dark mb-0">{tours.length}</h4>
            <p className="text-muted small mb-0 fw-semibold">Destinations Explored</p>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm p-3 bg-info-subtle rounded-4 h-100 border-info-subtle">
            <span className="fs-2 mb-1">🏖️</span>
            <h4 className="fw-bold text-info-emphasis mb-0">2</h4>
            <p className="text-info-emphasis small mb-0 fw-semibold">Sea Beaches (Kuakata & Cox's)</p>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm p-3 bg-warning-subtle rounded-4 h-100 border-warning-subtle">
            <span className="fs-2 mb-1">🏛️</span>
            <h4 className="fw-bold text-warning-emphasis mb-0">2</h4>
            <p className="text-warning-emphasis small mb-0 fw-semibold">Historic Palaces & Cities</p>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm p-3 bg-success-subtle rounded-4 h-100 border-success-subtle">
            <span className="fs-2 mb-1">⛰️</span>
            <h4 className="fw-bold text-success mb-0">2</h4>
            <p className="text-success-emphasis small mb-0 fw-semibold">Hills & Tea Valleys</p>
          </div>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedFilter(cat.value)}
            className={`btn btn-sm px-4 py-2 rounded-pill fw-semibold shadow-sm transition-all ${
              selectedFilter === cat.value
                ? "btn-primary text-white"
                : "btn-outline-secondary bg-white text-dark"
            }`}
          >
            <span className="me-1">{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Tours Grid */}
      <div className="row g-4">
        {filteredTours.map((tour, idx) => {
          const imgSrc = resolveTourImage(tour);
          const highlightsList = parseHighlights(tour.highlights);

          return (
            <div className="col-md-6 col-lg-4" key={tour.id || idx}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-shadow bg-white d-flex flex-column justify-content-between">
                <div>
                  <div
                    className="position-relative cursor-pointer"
                    style={{ cursor: "pointer", overflow: "hidden", backgroundColor: "#f8f9fa" }}
                    onClick={() => openModal(idx)}
                    title="Click to view full photo"
                  >
                    <img
                      src={imgSrc}
                      className="card-img-top"
                      alt={tour.place}
                      style={{
                        height: "270px",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center 25%",
                        transition: "transform 0.3s ease",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        const fallbackImg = resolveTourImage(tour);
                        if (e.target.src !== fallbackImg) {
                          e.target.src = fallbackImg;
                        }
                      }}
                    />
                    <span className="position-absolute bottom-0 end-0 bg-dark text-white px-3 py-1 small rounded-start opacity-80 shadow">
                      🔍 View Photo
                    </span>
                    <span className="position-absolute top-0 start-0 bg-primary text-white px-3 py-1 small rounded-bottom-end fw-semibold shadow">
                      📍 {tour.place.split(",")[0]}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                      <h4 className="fw-bold card-title mb-0 text-dark fs-5">{tour.place}</h4>
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {tour.tour_date && (
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                          📅 {tour.tour_date}
                        </span>
                      )}
                      {tour.location && (
                        <span className="badge bg-light text-secondary border">
                          📌 {tour.location}
                        </span>
                      )}
                    </div>

                    <p className="card-text text-secondary small lh-base mb-3">
                      {tour.description}
                    </p>

                    {highlightsList.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 mt-2">
                        {highlightsList.map((h, i) => (
                          <span key={i} className="badge bg-light text-dark border small">
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Full-size Image Modal with Navigation */}
      {activeTour && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.88)", zIndex: 1055 }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark text-white border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header border-0 pb-0 d-flex justify-content-between align-items-center px-4 pt-3">
                <div>
                  <h4 className="modal-title fw-bold text-white mb-0">{activeTour.place}</h4>
                  <p className="text-secondary small mb-0">
                    📍 {activeTour.location} • 📅 {activeTour.tour_date}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm rounded-circle px-3 py-2 fw-bold"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body p-4 text-center position-relative">
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={resolveTourImage(activeTour)}
                    alt={activeTour.place}
                    className="img-fluid rounded-3 shadow-lg"
                    style={{ maxHeight: "68vh", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>

                {/* Left / Right Nav buttons */}
                {filteredTours.length > 1 && (
                  <>
                    <button
                      className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-3 rounded-circle shadow p-3 fw-bold"
                      onClick={prevPhoto}
                      title="Previous photo"
                    >
                      ‹
                    </button>
                    <button
                      className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle shadow p-3 fw-bold"
                      onClick={nextPhoto}
                      title="Next photo"
                    >
                      ›
                    </button>
                  </>
                )}

                <div className="mt-3 text-start bg-secondary bg-opacity-25 p-3 rounded-3">
                  <p className="text-white-50 small mb-0 lh-base">{activeTour.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TourPage;
