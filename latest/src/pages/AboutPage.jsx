import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="about-page container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">About Me</h1>
        <p className="text-muted">Passionate Developer, Problem Solver & Lifelong Learner</p>
        <hr className="w-25 mx-auto" />
      </div>

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

      {/* Quick Bio Info Cards */}
      <div className="row g-4 mt-2">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 bg-light p-3">
            <div className="card-body">
              <h5 className="fw-bold mb-2">🎓 Education</h5>
              <p className="text-muted mb-1 fw-semibold">B.Sc. in Software Engineering</p>
              <p className="text-secondary small">Daffodil International University (DIU), Bangladesh</p>
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
              <h5 className="fw-bold mb-2">📍 Location & Langs</h5>
              <p className="text-muted mb-1 fw-semibold">Dhaka, Bangladesh</p>
              <p className="text-secondary small">Bengali (Native), English (Professional)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
