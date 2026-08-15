import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.technologies && p.technologies.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="projects-page container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5">Featured Projects & Innovations 💻🌱</h1>
        <p className="text-muted">
          Smart IoT hardware systems, full-stack web platforms, and engineering capstones
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Search Bar */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 col-lg-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input
              type="text"
              className="form-control border-start-0 py-2"
              placeholder="Search by project name or technology (e.g. IoT, React, MySQL)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading projects from database...</p>
        </div>
      )}

      {!loading && filteredProjects.length === 0 && (
        <div className="text-center my-5 text-muted">
          <h4>No projects found matching "{searchTerm}"</h4>
          <p>Try searching for something else.</p>
        </div>
      )}

      <div className="row g-4">
        {filteredProjects.map((project) => (
          <div className="col-md-6 col-lg-6" key={project.id}>
            <div className="card h-100 shadow-sm border-0 overflow-hidden hover-shadow d-flex flex-column justify-content-between">
              <div>
                {/* Project Image Preview */}
                {project.image && project.image !== "/portfolio.png" && project.image !== "/student.png" && project.image !== "/restaurant.png" && (
                  <div
                    className="position-relative cursor-pointer bg-dark"
                    style={{ height: "260px", cursor: "pointer", overflow: "hidden" }}
                    onClick={() => setSelectedImage(project.image)}
                    title="Click to view full photo"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover", objectPosition: "center 20%" }}
                    />
                    <span className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 small rounded-start opacity-75">
                      🔍 View Photo
                    </span>
                  </div>
                )}

                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 className="fw-bold card-title mb-0 text-dark">{project.title}</h4>
                    {project.featured && (
                      <span className="badge bg-warning text-dark">Featured</span>
                    )}
                  </div>

                  <div className="mb-3">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                      {project.technologies || "Full Stack"}
                    </span>
                  </div>

                  <p className="card-text text-secondary small lh-base mb-0">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 d-flex gap-2">
                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm flex-fill fw-semibold shadow-sm"
                  >
                    Live Demo 🚀
                  </a>
                )}
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark btn-sm flex-fill fw-semibold"
                  >
                    GitHub 💻
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
                  className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
                <img
                  src={selectedImage}
                  alt="Project Full"
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

export default ProjectsPage;
