import { useState, useEffect } from "react";
import { API_URL } from "../../config/api.js";

function Tour() {
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
        console.error("Error fetching tours:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="tour" className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">🌍 My Travel Journey</h2>
        <hr className="w-25 mx-auto" />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      <div className="row">
        {tours.map((tour) => (
          <div className="col-md-4 mb-4" key={tour.id}>
            <div className="card shadow h-100 border-0 overflow-hidden">
              <img
                src={tour.image || "/abu.jpeg"}
                className="card-img-top"
                alt={tour.place}
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "/abu.jpeg";
                }}
              />

              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold">{tour.place}</h5>
                  {tour.tour_date && (
                    <p className="text-muted small mb-2">📅 {tour.tour_date}</p>
                  )}
                  {tour.location && (
                    <p className="text-secondary small mb-2">📍 {tour.location}</p>
                  )}
                  <p className="card-text">{tour.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tour;