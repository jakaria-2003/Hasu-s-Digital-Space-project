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
      role: "Class Representative (CR) 👑",
      result: "Batch 42 (ID: 241-35-096)",
      description:
        "Serving as the official Class Representative (CR) for the batch. Specializing in Full-Stack Web Development, Data Science & Machine Learning, System Analysis & Design (SE-231 Capstone), and IoT Solutions.",
      keyCourses: [
        "System Analysis & Design",
        "Data Structures & Algorithms",
        "OOP with Java",
        "Relational Databases (MySQL)",
        "Web Engineering",
      ],
    },
    {
      degree: "Higher Secondary Certificate (HSC) — Science",
      institution: "Holy Land School and College, Dinajpur",
      location: "Dinajpur, Bangladesh",
      period: "Completed",
      status: "Completed",
      badge: "College / HSC",
      role: "Class Captain 🎖️",
      result: "Result: GPA A 🌟",
      description:
        "Served as Class Captain during college years. Graduated in Science Group with Grade A, focusing on Higher Mathematics, Physics, Chemistry, and ICT.",
      keyCourses: ["Higher Mathematics", "Physics", "Chemistry", "ICT"],
    },
    {
      degree: "Secondary School Certificate (SSC) — Science",
      institution: "Cantonment Public School And College, Bir Uttam Shaheed Mahbub Senanibas",
      location: "Kholahati, Dinajpur, Bangladesh",
      period: "Completed",
      status: "Completed",
      badge: "School / SSC",
      result: "Result: GPA A 🌟",
      description:
        "Graduated in Science Group with Grade A from one of Bangladesh's premier cantonment-administered public institutions, instilling strong discipline, ethics, and mathematics.",
      keyCourses: ["General Science", "Higher Mathematics", "Physics", "Chemistry"],
    },
  ];

  return (
    <div className="about-page container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">About Me</h1>
        <p className="text-muted">Passionate Developer, Class Representative & Problem Solver</p>
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
          <h2 className="fw-bold mb-2">Hi, I'm Abu Jakaria Hasu 👋</h2>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="badge bg-primary px-3 py-2 fs-6">DIU Class Representative (CR)</span>
            <span className="badge bg-secondary px-3 py-2 fs-6">Full Stack Developer</span>
            <span className="badge bg-info text-dark px-3 py-2 fs-6">Aspiring Data Scientist</span>
          </div>

          <p className="text-secondary lh-lg mb-3">
            I am a Software Engineering Student and <strong>Class Representative (CR)</strong> at <strong>Daffodil International University (DIU)</strong>. Passionate about building modern, scalable, high-performance web applications, IoT smart hardware, and exploring <strong>Data Science & Machine Learning</strong>.
          </p>

          <p className="text-secondary lh-lg">
            Former <strong>Class Captain</strong> at Holy Land School and College, Dinajpur (GPA: A) and alumnus of <strong>Cantonment Public School And College, BUSMS</strong> (GPA: A). With leadership experience, collaborative teamwork, and strong technical foundations, I love driving innovative projects from concept to deployment.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link to="/contact" className="btn btn-primary px-4 py-2 fw-semibold">
              Get in Touch ✉️
            </Link>
            <Link to="/projects" className="btn btn-outline-dark px-4 py-2 fw-semibold">
              Browse Projects 🚀
            </Link>
          </div>
        </div>
      </div>

      {/* Education Journey Section (SSC, HSC, University) */}
      <div className="my-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">🎓 Education Journey & Academic Background</h2>
          <p className="text-muted">Institutions, academic excellence, and leadership roles</p>
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
                    <span className="badge bg-success text-white fw-bold">
                      {edu.result}
                    </span>
                  </div>

                  <h5 className="fw-bold card-title mb-1 text-dark">{edu.degree}</h5>
                  <h6 className="text-primary fw-semibold mb-2">{edu.institution}</h6>
                  
                  {edu.role && (
                    <div className="mb-2">
                      <span className="badge bg-warning-subtle text-dark border border-warning fw-bold">
                        👑 Role: {edu.role}
                      </span>
                    </div>
                  )}

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
              <h5 className="fw-bold mb-2">👑 Leadership Roles</h5>
              <p className="text-primary fw-semibold mb-1">CR at DIU • Class Captain at Holy Land</p>
              <p className="text-secondary small">Air Rover Scout Leader (12th Air Scout Basic Course Certified)</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 bg-light p-3">
            <div className="card-body">
              <h5 className="fw-bold mb-2">💻 Full Stack & IoT</h5>
              <p className="text-muted mb-1 fw-semibold">Web Development & Smart Systems</p>
              <p className="text-secondary small">React SPAs, Node APIs, MySQL, IoT Sensors & Data Science Models</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 bg-light p-3">
            <div className="card-body">
              <h5 className="fw-bold mb-2">📍 Location & Origins</h5>
              <p className="text-muted mb-1 fw-semibold">Dinajpur → Dhaka, Bangladesh</p>
              <p className="text-secondary small">Bengali (Native), English (Professional Working)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
