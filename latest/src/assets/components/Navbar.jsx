import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark sticky-top shadow-sm py-2">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
          <span className="me-2">🚀</span> Hasu's Digital Space
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1 align-items-lg-center">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? "active fw-bold text-white border-bottom border-primary border-2" : ""}`
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? "active fw-bold text-white border-bottom border-primary border-2" : ""}`
                }
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/skills"
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? "active fw-bold text-white border-bottom border-primary border-2" : ""}`
                }
              >
                Skills
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? "active fw-bold text-white border-bottom border-primary border-2" : ""}`
                }
              >
                Projects
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? "active fw-bold text-white border-bottom border-primary border-2" : ""}`
                }
              >
                Library
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/certificates"
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? "active fw-bold text-white border-bottom border-primary border-2" : ""}`
                }
              >
                Certificates
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/tour"
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? "active fw-bold text-white border-bottom border-primary border-2" : ""}`
                }
              >
                Tour
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? "active fw-bold text-white border-bottom border-primary border-2" : ""}`
                }
              >
                Movies 🎬
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/lifestyle"
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? "active fw-bold text-white border-bottom border-primary border-2" : ""}`
                }
              >
                Sports & Hobbies ⚽
              </NavLink>
            </li>

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <NavLink
                to="/contact"
                className="btn btn-primary btn-sm px-3 py-2 fw-semibold text-white shadow-sm"
              >
                Contact Me ✉️
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;