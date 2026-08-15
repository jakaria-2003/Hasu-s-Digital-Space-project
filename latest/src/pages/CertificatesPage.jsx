import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/certificates`)
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading certificates:", err);
        setLoading(false);
      });
  }, []);

  const getIssuerBadge = (issuer) => {
    if (issuer.toLowerCase().includes("google")) return "bg-danger-subtle text-danger border border-danger-subtle";
    if (issuer.toLowerCase().includes("codesignal")) return "bg-primary-subtle text-primary border border-primary-subtle";
    if (issuer.toLowerCase().includes("goedu")) return "bg-warning-subtle text-warning-emphasis border border-warning-subtle";
    if (issuer.toLowerCase().includes("scout")) return "bg-success-subtle text-success border border-success-subtle";
    return "bg-secondary-subtle text-secondary border border-secondary-subtle";
  };

  return (
    <div className="certificates-page container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Certifications & Achievements 🏆</h1>
        <p className="text-muted">
          Verified professional credentials, computer science certifications & leadership milestones
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading credentials from database...</p>
        </div>
      )}

      <div className="row g-4">
        {certificates.map((cert) => (
          <div className="col-md-6 col-lg-4" key={cert.id}>
            <div className="card h-100 shadow-sm border-0 overflow-hidden hover-shadow d-flex flex-column justify-content-between">
              <div>
                {cert.image && (
                  <div
                    className="position-relative bg-light text-center border-bottom cursor-pointer"
                    style={{ cursor: "pointer", overflow: "hidden" }}
                    onClick={() => setSelectedImage(cert.image)}
                    title="Click to view full certificate"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="img-fluid p-2"
                      style={{ height: "220px", width: "100%", objectFit: "contain" }}
                    />
                    <span className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 small rounded-start opacity-75">
                      🔍 Zoom
                    </span>
                  </div>
                )}

                <div className="p-3">
                  <div className="mb-2">
                    <span className={`badge ${getIssuerBadge(cert.issuer || "")} mb-1`}>
                      {cert.issuer || "Verified Issuer"}
                    </span>
                  </div>

                  <h5 className="fw-bold card-title mb-2 text-dark">
                    {cert.title}
                  </h5>

                  {cert.issue_date && (
                    <p className="text-muted small mb-2">
                      📅 Date: <strong>{cert.issue_date}</strong>
                    </p>
                  )}

                  {cert.description && (
                    <p className="card-text text-secondary small lh-base">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-3 pt-0">
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm w-100 fw-semibold"
                  >
                    Verify Credential ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal for Full View */}
      {selectedImage && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-transparent border-0 text-center">
              <div className="modal-body p-0 position-relative">
                <button
                  type="button"
                  className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
                <img
                  src={selectedImage}
                  alt="Certificate Full"
                  className="img-fluid rounded-3 shadow-lg bg-white"
                  style={{ maxHeight: "85vh" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificatesPage;
