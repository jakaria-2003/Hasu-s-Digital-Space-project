import { useState, useEffect } from "react";
import { API_URL } from "../../config/api.js";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="container py-5" id="projects">
      <div className="text-center">
        <h2 className="fw-bold">Featured Projects</h2>
        <hr className="w-25 mx-auto" />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading projects from database...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-warning text-center">
          Could not load projects from server. Make sure backend is running.
        </div>
      )}

      <div className="row mt-4">
        {projects.map((project) => (
          <div className="col-md-4 mb-4" key={project.id}>
            <div className="card shadow h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold">{project.title}</h5>
                  <p className="badge bg-secondary mb-2">
                    {project.technologies || "Full Stack"}
                  </p>
                  <p className="card-text text-muted">{project.description}</p>
                </div>
                <div className="mt-3 d-flex gap-2">
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;