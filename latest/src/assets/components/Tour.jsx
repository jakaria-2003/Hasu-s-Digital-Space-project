import { useState, useEffect } from "react";
import { API_URL } from "../../config/api.js";

const DEFAULT_TOURS = [
  {
    id: 1,
    place: "Kuakata Sea Beach",
    location: "Patuakhali, Bangladesh",
    tour_date: "February 2026",
    image: "/tours/kuakata.png",
    description: "Enjoying the golden sunset & sunrise views atop traditional sea fishing boats at Sagar Kannya Kuakata.",
  },
  {
    id: 2,
    place: "Mohera Zamindar Bari, Tangail",
    location: "Tangail, Bangladesh",
    tour_date: "March 2026",
    image: "/tours/tangail.jpg",
    description: "Exploring the historic Greco-Roman palace architecture, vintage lodges, and royal courtyards.",
  },
  {
    id: 3,
    place: "Sonargaon & Panam Nagar",
    location: "Narayanganj, Bangladesh",
    tour_date: "January 2026",
    image: "/tours/sonargaon.png",
    description: "Walking through the historic ancient capital of Bengal, Panam Nagar and Boro Sardar Bari courtyard.",
  },
  {
    id: 4,
    place: "Cox's Bazar",
    location: "Chittagong, Bangladesh",
    tour_date: "January 2026",
    image: "/abu.jpeg",
    description: "Riding ATV beach-buggies along the world's longest natural sea beach.",
  },
  {
    id: 5,
    place: "Sajek Valley",
    location: "Rangamati, Bangladesh",
    tour_date: "March 2025",
    image: "/hhp.jpg",
    description: "A memorable journey through the lush green mountains and misty cloudscapes of Sajek.",
  },
  {
    id: 6,
    place: "Sylhet",
    location: "Sylhet Division, Bangladesh",
    tour_date: "May 2026",
    image: "/sylhet.jpg",
    description: "Exploring emerald tea gardens, clear freshwater rivers, and tranquil greenery.",
  },
];

function Tour() {
  const [tours, setTours] = useState(DEFAULT_TOURS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/tours`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setTours(data.data);
        }
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

      <div className="row g-4">
        {tours.map((tour) => (
          <div className="col-md-6 col-lg-4" key={tour.id}>
            <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden hover-shadow">
              <img
                src={tour.image || "/tours/kuakata.png"}
                className="card-img-top"
                alt={tour.place}
                style={{ height: "220px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "/abu.jpeg";
                }}
              />

              <div className="card-body d-flex flex-column justify-content-between p-4">
                <div>
                  <h5 className="card-title fw-bold text-dark">{tour.place}</h5>
                  {tour.tour_date && (
                    <p className="text-muted small mb-2">📅 {tour.tour_date}</p>
                  )}
                  {tour.location && (
                    <p className="text-secondary small mb-2">📍 {tour.location}</p>
                  )}
                  <p className="card-text text-secondary small">{tour.description}</p>
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