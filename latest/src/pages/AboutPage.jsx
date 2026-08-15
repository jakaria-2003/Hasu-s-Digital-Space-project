import { Link } from "react-router-dom";

function AboutPage() {
  const educationTimeline = [
    {
      degree: "B.Sc. in Software Engineering",
      institution: "Daffodil International University (DIU)",
      location: "Dhaka, Bangladesh",
      period: "2024 – Present (Ongoing)",
      status: "In Progress",
      badge: "University",
      description:
        "Pursuing undergraduate degree focusing on Software Architecture, Web Engineering, Data Science & Machine Learning, System Analysis & Design (SE-231), and Relational Database Systems.",
      keyCourses: ["Data Structures & Algorithms", "System Analysis & Design", "OOP in Java", "Database Systems", "Web Engineering"],
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Science Division",
      location: "Dhaka Board, Bangladesh",
      period: "Completed",
      status: "Completed",
      badge: "College / HSC",
      description:
        "Completed higher secondary education in Science with core emphasis on Mathematics, Physics, Chemistry, and Information & Communication Technology (ICT).",
      keyCourses: ["Higher Mathematics", "Physics", "Chemistry", "ICT"],
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Science Division",
      location: "Dhaka Board, Bangladesh",
      period: "Completed",
      status: "Completed",
      badge: "High School / SSC",
      description:
        "Graduated with foundational excellence in Science and Mathematics, laying the early groundwork for engineering and computing passions.",
      keyCourses: ["General Science", "Higher Mathematics", "Physics", "Chemistry"],
    },
  ];

  return (
    <div className="about-page container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">About Me</h1>
        <p className="text-muted">Passionate Developer, Problem Solver & Lifelong Learner</p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Hero Bio Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <img
            src="/hasu.jpeg"
            alt="Abu Jakaria Hasu"
            className="img-fluid rounded-4 shadow-lg border border-3 border-white"
            style={{ maxHeight: "360px", width: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.src = "/jakaria.jpeg";
            }}
          />
        </div>
        <div className="col-md-7">
          <h2 className="fw-bold mb-3">Hi, I'm Abu Jakaria Hasu 👋</h2>
          <p className="lead text-primary fw-semibold">
            Full Stack Web Developer | React & Node.js | Aspiring Data Scientist
          </p>
          <p className="text-secondary lh-lg">
            I am a Software Engineering Student at <strong>Daffodil International University (DIU)</strong>. Passionate about building modern, scalable, high-performance, and responsive web applications while actively exploring <strong>Data Science and Machine Learning</strong>.
          </p>
          <p className="text-secondary lh-lg">
            With solid expertise across full-stack technologies (React.js, Node.js, Express, PHP, MySQL) and a strong enthusiasm for data-driven algorithms and AI intelligence, I love solving complex technical challenges and turning ideas into impactful digital products.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link to="/contact" className="btn btn-primary px-4 py-2">
              Get in Touch ✉️
            </Link>
            <Link to="/projects" className="btn btn-outline-secondary px-4 py-2">
              Browse Projects 🚀
            </Link>
          </div>
        </div>
      </div>

      {/* Education Journey Section (SSC, HSC, University) */}
      <div className="my-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">🎓 Education Journey</h2>
          <p className="text-muted">Academic background from secondary school to university engineering</p>
        </div>

        <div className="row g-4">
          {educationTimeline.map((edu, idx) => (
            <div className="col-lg-4" key={idx}>
              <div className="card h-100 shadow-sm border-0 p-4 hover-shadow bg-light d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                      {edu.badge}
                    </span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle small">
                      {edu.status}
                    </span>
                  </div>

                  <h4 className="fw-bold card-title mb-1 text-dark">{edu.degree}</h4>
                  <h6 className="text-primary fw-semibold mb-1">{edu.institution}</h6>
                  <p className="text-muted small mb-3">📍 {edu.location} • 📅 {edu.period}</p>

                  <p className="card-text text-secondary small lh-base mb-3">
                    {edu.description}
                  </p>
                </div>

                <div>
                  <h6 className="fw-bold small text-dark mb-2">Key Areas:</h6>
                  <div className="d-flex flex-wrap gap-1">
                    {edu.keyCourses.map((c, i) => (
                      <span key={i} className="badge bg-white text-dark border small">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Bio Info Cards */}
      <div className="row g-4 mt-2">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 bg-light p-3">
            <div className="card-body">
              <h5 className="fw-bold mb-2">🎓 DIU Scout Leader</h5>
              <p className="text-muted mb-1 fw-semibold">Air Rover Scout Group</p>
              <p className="text-secondary small">Completed 12th Air Scout Unit Leader Basic Course in Cox's Bazar</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 bg-light p-3">
            <div className="card-body">
              <h5 className="fw-bold mb-2">💻 Full Stack & Data Science</h5>
              <p className="text-muted mb-1 fw-semibold">Web Development & AI/ML</p>
              <p className="text-secondary small">React SPAs, Node APIs, Relational DBs & Data Science Models</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 bg-light p-3">
            <div className="card-body">
              <h5 className="fw-bold mb-2">📍 Location & Languages</h5>
              <p className="text-muted mb-1 fw-semibold">Dhaka, Bangladesh</p>
              <p className="text-secondary small">Bengali (Native), English (Professional Working)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
