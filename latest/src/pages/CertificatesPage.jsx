import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

const DEFAULT_CERTIFICATES = [
  {
    id: 1,
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google (Coursera)",
    issue_date: "March 10, 2026",
    credential_url: "https://coursera.org/verify/ORZRFG1G6RPQ",
    image: "/certificates/google-networking.jpg",
    description:
      "Google Career Certificate in computer networking architecture, TCP/IP, UDP, DNS, routing, and cloud infrastructure.",
  },
  {
    id: 2,
    title: "Mastering Design Patterns with Java",
    issuer: "CodeSignal",
    issue_date: "April 11, 2026",
    credential_url: "https://codesignal.com/learn/certificates/cmnhk7moo004bl804aqgvm1vo/course-paths/85",
    image: "/certificates/codesignal-java.png",
    description:
      "Advanced Java software engineering, OOP design patterns, computer science fundamentals, and system architecture.",
  },
  {
    id: 3,
    title: "Leadership Qualities – Boss VS Leader",
    issuer: "GoEdu (GEAC Accredited)",
    issue_date: "June 09, 2026",
    credential_url: "https://goedu.ac",
    image: "/certificates/goedu-leadership.png",
    description:
      "Completed with distinction, certified in modern leadership principles, strategic decision making, and team management.",
  },
  {
    id: 4,
    title: "Unified Modeling Language (UML)",
    issuer: "European Open University",
    issue_date: "April 18, 2026",
    credential_url: "https://europeanopenuniversity.com",
    image: "/certificates/european-uml.png",
    description:
      "Professional Certificate Program in software system modeling, class diagrams, sequence diagrams, and architecture design.",
  },
  {
    id: 5,
    title: "12th Air Scout Unit Leader Basic Course",
    issuer: "Bangladesh Scouts, Air Region",
    issue_date: "January 19, 2025",
    credential_url: "https://scouts.gov.bd",
    image: "/certificates/bangladesh-air-scouts.png",
    description:
      "Represented Daffodil International University Air Rover Scout Group (Cert No: 0038/2025) in leadership & scout training in Cox's Bazar.",
  },
];

function CertificatesPage() {
  const [certificates, setCertificates] = useState(DEFAULT_CERTIFICATES);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/certificates`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend offline");
        return res.json();
      })
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setCertificates(data.data);
        }
      })
      .catch((err) => {
        console.log("Using default certificates catalog:", err.message);
      });
  }, []);

  const getIssuerBadge = (issuer = "") => {
    const iss = issuer.toLowerCase();
    if (iss.includes("google")) return "bg-danger-subtle text-danger border border-danger-subtle";
    if (iss.includes("codesignal")) return "bg-primary-subtle text-primary border border-primary-subtle";
    if (iss.includes("goedu")) return "bg-warning-subtle text-warning-emphasis border border-warning-subtle";
    if (iss.includes("scout")) return "bg-success-subtle text-success border border-success-subtle";
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
          style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1055 }}
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
