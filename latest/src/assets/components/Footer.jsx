import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <div className="container">
        <div className="row g-4 justify-content-between align-items-center">
          <div className="col-md-5">
            <h4 className="fw-bold mb-2">🚀 Hasu's Digital Space</h4>
            <p className="text-secondary small mb-0">
              Personal portfolio showcasing web development projects, technical skills, certifications, and travel memories.
            </p>
          </div>

          <div className="col-md-7">
            <div className="d-flex flex-wrap justify-content-md-end gap-3 small">
              <Link to="/" className="text-light text-decoration-none">
                Home
              </Link>
              <Link to="/about" className="text-light text-decoration-none">
                About
              </Link>
              <Link to="/skills" className="text-light text-decoration-none">
                Skills
              </Link>
              <Link to="/projects" className="text-light text-decoration-none">
                Projects
              </Link>
              <Link to="/library" className="text-light text-decoration-none">
                Library
              </Link>
              <Link to="/certificates" className="text-light text-decoration-none">
                Certificates
              </Link>
              <Link to="/tour" className="text-light text-decoration-none">
                Tour
              </Link>
              <Link to="/contact" className="text-light text-decoration-none">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary opacity-25" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small text-secondary">
          <p className="mb-0">© {new Date().getFullYear()} Abu Jakaria Hasu. All Rights Reserved.</p>
          <p className="mb-0">Built with React, Node.js, Express & MySQL 💙</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;