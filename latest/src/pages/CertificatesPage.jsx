import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="certificates-page container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Certifications & Credentials 🏆</h1>
        <p className="text-muted">Verified skills, online coursework, and professional achievements</p>
        <hr className="w-25 mx-auto" />
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading credentials...</p>
        </div>
      )}

      <div className="row g-4">
        {certificates.map((cert) => (
          <div className="col-md-6 col-lg-4" key={cert.id}>
            <div className="card h-100 shadow-sm border-0 p-3">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <span className="fs-1 me-2">🥇</span>
                    <div>
                      <h5 className="fw-bold card-title mb-0">{cert.title}</h5>
                      {cert.issuer && (
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle mt-1">
                          {cert.issuer}
                        </span>
                      )}
                    </div>
                  </div>

                  {cert.issue_date && (
                    <p className="text-muted small mb-2">
                      📅 Issued: <strong>{cert.issue_date}</strong>
                    </p>
                  )}

                  {cert.description && (
                    <p className="card-text text-secondary small">{cert.description}</p>
                  )}
                </div>

                {cert.credential_url && (
                  <div className="mt-3">
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm w-100"
                    >
                      Verify Credential ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CertificatesPage;
