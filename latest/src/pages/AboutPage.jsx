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
          <p className="lead text-primary fw-medium">
            Software Engineering Student at Daffodil International University (DIU).
          </p>
          <p className="text-secondary lh-lg">
            I am an enthusiastic web developer with a strong foundation in modern frontend and backend technologies.
            I specialize in building performant, responsive web applications using <strong>React.js, Node.js, Express, PHP, and MySQL</strong>.
          </p>
          <p className="text-secondary lh-lg">
            My goal is to craft digital products that provide exceptional user experiences and solve real-world problems. When I am not coding, you will find me reading tech books, exploring scenic destinations across Bangladesh, or experimenting with new frameworks.
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
              <h5 className="fw-bold mb-2">💻 Focus Areas</h5>
              <p className="text-muted mb-1 fw-semibold">Full Stack Web Architecture</p>
              <p className="text-secondary small">React SPAs, REST APIs, Relational Database Design</p>
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
