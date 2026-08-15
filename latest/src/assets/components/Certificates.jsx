import { useState, useEffect } from "react";
import { API_URL } from "../../config/api.js";

function Certificates() {
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
        console.error("Error fetching certificates:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="container py-5" id="certificates">
      <div className="text-center">
        <h2 className="fw-bold">Certificates</h2>
        <hr className="w-25 mx-auto" />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      <div className="row mt-4">
        {certificates.map((cert) => (
          <div className="col-md-4 mb-4" key={cert.id}>
            <div className="card shadow h-100 border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <span className="fs-3 me-2">🏆</span>
                  <h5 className="card-title fw-bold mb-0">{cert.title}</h5>
                </div>
                {cert.issuer && (
                  <h6 className="card-subtitle mb-2 text-primary">
                    {cert.issuer} {cert.issue_date ? `(${cert.issue_date})` : ""}
                  </h6>
                )}
                {cert.description && (
                  <p className="card-text text-muted small">{cert.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificates;