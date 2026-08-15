import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

function TourPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <div className="card h-100 shadow-sm border-0 overflow-hidden">
              <img
                src={tour.image || "/abu.jpeg"}
                className="card-img-top"
                alt={tour.place}
                style={{ height: "230px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "/abu.jpeg";
                }}
              />

              <div className="card-body d-flex flex-column justify-content-between p-4">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="fw-bold card-title mb-0">{tour.place}</h4>
                    {tour.tour_date && (
                      <span className="badge bg-light text-dark border">
                        📅 {tour.tour_date}
                      </span>
                    )}
                  </div>

                  {tour.location && (
                    <p className="text-primary small mb-3">📍 {tour.location}</p>
                  )}

                  <p className="card-text text-secondary">{tour.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourPage;
