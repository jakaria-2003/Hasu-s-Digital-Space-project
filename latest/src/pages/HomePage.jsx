import { Link } from "react-router-dom";

function HomePage() {
  const features = [
    {
      title: "About & Education",
      icon: "🎓",
      desc: "Bio, education journey (SSC, HSC, DIU Software Engineering), and DIU Scout milestones.",
      link: "/about",
      badge: "Journey",
      btnClass: "btn-secondary",
    },
    {
      title: "Projects",
      icon: "💻",
      desc: "Explore web development projects, Smart Waste Collection System & GitHub repositories.",
      link: "/projects",
      badge: "Full Stack",
      btnClass: "btn-primary",
    },
    {
      title: "Skills & Tech",
      icon: "⚡",
      desc: "Technical skill set, programming languages, and proficiency levels.",
      link: "/skills",
      badge: "Expertise",
      btnClass: "btn-success",
    },
    {
      title: "My Library",
      icon: "📚",
      desc: "Curated Bengali literature and software books with direct Read Online & PDF access.",
      link: "/library",
      badge: "Knowledge",
      btnClass: "btn-info text-white",
    },
    {
      title: "Certificates",
      icon: "🏆",
      desc: "Verified Google, CodeSignal, GoEdu & European Open University credentials.",
      link: "/certificates",
      badge: "Credentials",
      btnClass: "btn-warning text-dark",
    },
    {
      title: "Travel Journey",
      icon: "🌍",
      desc: "Memorable travel stories and pictures across Cox's Bazar, Sajek, and Sylhet.",
      link: "/tour",
      badge: "Adventures",
      btnClass: "btn-danger",
    },
    {
      title: "Movies & Cinema",
      icon: "🎬",
      desc: "Favorite sci-fi masterpieces, inspiring cinema, and movie reflections.",
      link: "/movies",
      badge: "Entertainment",
      btnClass: "btn-dark",
    },
    {
      title: "Sports & Hobbies",
      icon: "⚽",
      desc: "Marathon running, 8-ball pool, tactical chess, traditional net fishing, and scouting.",
      link: "/lifestyle",
      badge: "Lifestyle",
      btnClass: "btn-primary",
    },
    {
      title: "Contact Me",
      icon: "📬",
      desc: "Get in touch for collaborations, freelance projects, or just to say hello.",
      link: "/contact",
      badge: "Connect",
      btnClass: "btn-outline-dark",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="bg-light py-5 border-bottom">
        <div className="container py-4 text-center">
          <div className="mb-4">
            <img
              src="/hasu.jpeg"
              alt="Abu Jakaria Hasu"
              className="rounded-circle shadow-lg border border-4 border-white"
              style={{ width: "170px", height: "170px", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "/jakaria.jpeg";
              }}
            />
          </div>
          <h1 className="display-4 fw-bold mb-2">Abu Jakaria Hasu</h1>
          <p className="lead text-primary fw-semibold mb-3">
            Full Stack Web Developer | React & Node.js | Aspiring Data Scientist
          </p>
          <p className="text-muted mx-auto" style={{ maxWidth: "720px", fontSize: "1.1rem" }}>
            Software Engineering Student at Daffodil International University. Passionate about building modern, scalable, high-performance, and responsive web applications while exploring Data Science and Machine Learning.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/projects" className="btn btn-primary btn-lg px-4 shadow-sm">
              View My Projects 🚀
            </Link>
            <Link to="/contact" className="btn btn-outline-dark btn-lg px-4">
              Get in Touch ✉️
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Pages / Features Grid */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Explore My Digital Space</h2>
          <p className="text-muted">
            Select any section below to navigate to its dedicated page
          </p>
          <hr className="w-25 mx-auto" />
        </div>

        <div className="row g-4">
          {features.map((item, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="card h-100 shadow-sm border-0 transition-card hover-shadow">
                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fs-1">{item.icon}</span>
                      <span className="badge bg-light text-dark border">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="fw-bold card-title">{item.title}</h4>
                    <p className="text-muted small">{item.desc}</p>
                  </div>
                  <div className="mt-3">
                    <Link
                      to={item.link}
                      className={`btn ${item.btnClass} w-100 py-2 fw-semibold shadow-sm`}
                    >
                      Open {item.title} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
