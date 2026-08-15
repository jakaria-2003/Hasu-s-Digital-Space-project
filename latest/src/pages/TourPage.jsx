import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

function TourPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/tours`)
      .then((res) => res.json())
      .then((data) => {
        setTours(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading tours:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="tour-page container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">🌍 My Travel Diaries</h1>
        <p className="text-muted">Exploring breathtaking landscapes, natural wonders, and culture across Bangladesh</p>
        <hr className="w-25 mx-auto" />
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading travel memories...</p>
        </div>
      )}

      <div className="row g-4">
        {tours.map((tour) => (
          <div className="col-md-6 col-lg-4" key={tour.id}>
            <div className="card h-100 shadow-sm border-0 overflow-hidden hover-shadow">
              <div
                className="position-relative cursor-pointer"
                style={{ cursor: "pointer", overflow: "hidden", backgroundColor: "#f8f9fa" }}
                onClick={() => setSelectedImage(tour.image)}
                title="Click to view full photo"
              >
                <img
                  src={tour.image || "/hhp.jpg"}
                  className="card-img-top"
                  alt={tour.place}
                  style={{
                    height: "260px",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center 20%",
                    transition: "transform 0.3s ease",
                  }}
                  onError={(e) => {
                    e.target.src = "/hhp.jpg";
                  }}
                />
                <span className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 small rounded-start opacity-75">
                  🔍 View Photo
                </span>
              </div>

              <div className="card-body d-flex flex-column justify-content-between p-4">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="fw-bold card-title mb-0 text-dark">{tour.place}</h4>
                    {tour.tour_date && (
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                        📅 {tour.tour_date}
                      </span>
                    )}
                  </div>

                  {tour.location && (
                    <p className="text-muted small mb-3">📍 {tour.location}</p>
                  )}

                  <p className="card-text text-secondary small lh-base">{tour.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-size Image Viewer Modal */}
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
                  alt="Tour Full"
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

export default TourPage;
