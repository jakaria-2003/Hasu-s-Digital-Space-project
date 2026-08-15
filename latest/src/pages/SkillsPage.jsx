import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch(`${API_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading skills:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(skills.map((s) => s.category).filter(Boolean))];

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const getBadgeColor = (category) => {
    switch (category?.toLowerCase()) {
      case "frontend":
        return "bg-primary";
      case "backend":
        return "bg-success";
      case "database":
        return "bg-warning text-dark";
      case "languages":
        return "bg-info text-dark";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="skills-page container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5">Technical Skills & Expertise</h1>
        <p className="text-muted">Live proficiency metrics powered by MySQL backend</p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Category Filter Pills */}
      {categories.length > 1 && (
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`btn btn-sm rounded-pill px-3 ${
                selectedCategory === cat ? "btn-dark shadow-sm" : "btn-outline-secondary"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Fetching skill metrics...</p>
        </div>
      )}

      <div className="row g-4">
        {filteredSkills.map((skill) => (
          <div className="col-md-6" key={skill.id}>
            <div className="card shadow-sm border-0 p-3 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold fs-5">{skill.name}</span>
                  <span className={`badge ${getBadgeColor(skill.category)}`}>
                    {skill.category || "Technical"}
                  </span>
                </div>
                <div className="progress mb-2" style={{ height: "12px" }}>
                  <div
                    className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: `${skill.proficiency}%` }}
                    aria-valuenow={skill.proficiency}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="text-end text-muted small fw-semibold">
                  Proficiency: {skill.proficiency}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPage;
