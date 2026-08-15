import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

const DEFAULT_SKILLS = [
  { id: 1, name: "React.js", category: "Frontend", proficiency: 90 },
  { id: 2, name: "JavaScript (ES6+)", category: "Languages", proficiency: 92 },
  { id: 3, name: "Node.js & Express", category: "Backend", proficiency: 85 },
  { id: 4, name: "MySQL & Relational Databases", category: "Database", proficiency: 88 },
  { id: 5, name: "Data Science & Python", category: "Data Science", proficiency: 80 },
  { id: 6, name: "Java & OOP Design Patterns", category: "Languages", proficiency: 82 },
  { id: 7, name: "HTML5 & Modern CSS3 / Bootstrap", category: "Frontend", proficiency: 95 },
  { id: 8, name: "Git, GitHub & Cloud Deployment", category: "DevOps & Tools", proficiency: 85 },
];

function SkillsPage() {
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch(`${API_URL}/api/skills`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend offline");
        return res.json();
      })
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setSkills(data.data);
        }
      })
      .catch((err) => {
        console.log("Using default skill metrics:", err.message);
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
      case "data science":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="skills-page container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5">Technical Skills & Expertise ⚡</h1>
        <p className="text-muted">Core competencies across Full Stack Development, Data Science, and IoT</p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Category Filter Pills */}
      {categories.length > 1 && (
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                selectedCategory === cat ? "btn-dark shadow-sm" : "btn-outline-secondary"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="row g-4">
        {filteredSkills.map((skill) => (
          <div className="col-md-6" key={skill.id}>
            <div className="card shadow-sm border-0 p-3 h-100 hover-shadow">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold fs-5 text-dark">{skill.name}</span>
                  <span className={`badge ${getBadgeColor(skill.category)}`}>
                    {skill.category || "Technical"}
                  </span>
                </div>
                <div className="progress mb-2" style={{ height: "12px", borderRadius: "6px" }}>
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
