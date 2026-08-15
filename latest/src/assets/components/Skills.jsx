import { useState, useEffect } from "react";
import { API_URL } from "../../config/api.js";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
        setLoading(false);
      });
  }, []);

  const getProgressColor = (index) => {
    const colors = ["bg-success", "bg-info", "bg-primary", "bg-warning", "bg-danger", "bg-dark"];
    return colors[index % colors.length];
  };

  return (
    <section className="container py-5" id="skills">
      <div className="text-center">
        <h2 className="fw-bold">My Skills</h2>
        <hr className="w-25 mx-auto" />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      <div className="row mt-4">
        {skills.map((skill, index) => (
          <div className="col-md-6 mb-4" key={skill.id}>
            <div className="d-flex justify-content-between mb-1">
              <span className="fw-semibold">{skill.name}</span>
              <span className="text-muted">{skill.proficiency}%</span>
            </div>
            <div className="progress" style={{ height: "18px" }}>
              <div
                className={`progress-bar ${getProgressColor(index)}`}
                role="progressbar"
                style={{ width: `${skill.proficiency}%` }}
                aria-valuenow={skill.proficiency}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {skill.proficiency}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;