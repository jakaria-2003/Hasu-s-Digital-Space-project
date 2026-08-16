import { useState } from "react";
import { Link } from "react-router-dom";

const CLUBS_DATA = [
  {
    id: 1,
    name: "DIU Air Rover Scout Group (DIU ARSG)",
    shortName: "DIU Air Rover Scout",
    role: "Rover Mate",
    roleType: "Leadership",
    category: "Scouting & Leadership",
    badgeClass: "bg-success text-white",
    icon: "⚜️",
    logo: "/clubs/air-rover-scout.png",
    org: "Daffodil International University & Bangladesh Scouts (Air Region)",
    duration: "Active Member & Leader",
    description:
      "Serving as an active Rover Mate and certified scout unit leader. Committed to community service, leadership training, adventure camps, and disaster preparedness.",
    highlights: [
      "12th Air Scout Unit Leader Basic Course certified (Cert No: 0038/2025)",
      "Leading patrol teams in scouting camps, adventure rallies, and disaster drills",
      "Representing DIU in national and regional rover scout gatherings across Bangladesh",
      "Practicing core scout ethics: Duty to Creator, Duty to Country, and Selfless Service",
    ],
    tags: ["Leadership", "Rover Mate", "Air Scouts", "Community Service", "First Aid"],
  },
  {
    id: 2,
    name: "Software Quality Assurance & Testing Club (SQATC)",
    shortName: "SQATC DIU",
    role: "Deputy Sports Secretary",
    roleType: "Executive",
    category: "Executive Leadership & Tech",
    badgeClass: "bg-danger text-white",
    icon: "🧪",
    logo: "/clubs/sqat.png",
    org: "Department of Software Engineering, DIU",
    duration: "Executive Committee Member",
    description:
      "Holding an executive leadership position as Deputy Sports Secretary. Managing club sports events, fitness initiatives, while actively engaging in software quality assurance & testing workshops.",
    highlights: [
      "Organizing intra-departmental sports tournaments (Cricket, Football, Badminton)",
      "Promoting physical wellness, team coordination, and student engagement",
      "Active participant in software testing workshops, test automation & QA methodologies",
      "Coordinating inter-batch sports matches and annual club celebrations",
    ],
    tags: ["Executive Role", "Deputy Sports Secretary", "SQA", "Software Testing", "Sports"],
  },
  {
    id: 3,
    name: "Data Science Club (DSC)",
    shortName: "Data Science Club",
    role: "Executive Member",
    roleType: "Executive",
    category: "AI & Data Science",
    badgeClass: "bg-primary text-white",
    icon: "📊",
    logo: "/clubs/data-science.png",
    org: "Daffodil International University",
    duration: "Executive Member",
    description:
      "Executive committee member helping organize hands-on technical workshops, machine learning seminars, and data analytics masterclasses for aspiring data professionals.",
    highlights: [
      "Coordinating data science workshops on Python, Pandas, NumPy, and Scikit-Learn",
      "Fostering research culture in machine learning, AI, and predictive analytics",
      "Mentoring junior peers in exploratory data analysis and Kaggle problem sets",
      "Collaborating on data-driven projects and university tech exhibitions",
    ],
    tags: ["Executive Member", "Data Science", "Machine Learning", "Python", "AI / Analytics"],
  },
  {
    id: 4,
    name: "DIU Software Engineering Club (DIUSEC)",
    shortName: "DIUSEC",
    role: "General Member",
    roleType: "General",
    category: "Software Engineering & Tech",
    badgeClass: "bg-info text-dark",
    icon: "💻",
    logo: "/clubs/sec.png",
    org: "Department of Software Engineering, DIU",
    duration: "Active Member",
    description:
      "Active general member collaborating in coding bootcamps, project showcases, hackathons, and software engineering technical talk series.",
    highlights: [
      "Participating in competitive programming contests and software design sessions",
      "Collaborating on full-stack development projects and agile teamwork",
      "Engaging with industry experts, tech alumni, and software professionals",
      "Contributing to departmental tech festivals and developer meetups",
    ],
    tags: ["Software Engineering", "Full-Stack Dev", "Coding Hackathons", "DIUSEC"],
  },
  {
    id: 5,
    name: "Daffodil Prothom Alo Bondhushava",
    shortName: "Bondhushava DIU",
    role: "General Member",
    roleType: "General",
    category: "Social Welfare & Cultural",
    badgeClass: "bg-warning text-dark",
    icon: "🌸",
    logo: "/clubs/bondhushava.png",
    org: "Prothom Alo Bondhushava & DIU",
    duration: "Active Member",
    description:
      "Dedicated member participating in nationwide humanitarian campaigns, cultural initiatives, tree planting drives, and youth empowerment projects.",
    highlights: [
      "Engaging in blood donation drives, winter clothes distribution, and flood relief efforts",
      "Participating in literature discussions, book reading competitions, and cultural celebrations",
      "Promoting ethics, positive social mindset, and youth leadership",
      "Volunteering in community development campaigns and environmental awareness rallies",
    ],
    tags: ["Bondhushava", "Prothom Alo", "Social Welfare", "Culture & Literature", "Volunteering"],
  },
  {
    id: 6,
    name: "All Stars Daffodil",
    shortName: "All Stars DIU",
    role: "General Member",
    roleType: "General",
    category: "Campus Community & Athletics",
    badgeClass: "bg-secondary text-white",
    icon: "⭐",
    logo: "/clubs/all-stars.png",
    org: "Daffodil International University",
    duration: "Active Member",
    description:
      "Active member promoting campus spirit, youth leadership, athletics, teamwork, and celebratory extracurricular events across Daffodil International University.",
    highlights: [
      "Collaborating in university-wide cultural galas, youth forums, and celebrations",
      "Promoting sportsmanship, student camaraderie, and inter-faculty networking",
      "Volunteering in orientation programs and campus community engagement drives",
      "Upholding an active, vibrant, and collaborative university student life",
    ],
    tags: ["All Stars", "Campus Life", "Sports & Athletics", "Youth Empowerment", "Teamwork"],
  },
];

function ClubsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedLogo, setSelectedLogo] = useState(null);

  const filterCategories = [
    "All",
    "Executive & Leadership",
    "Tech & AI",
    "Scouting & Social",
  ];

  const filteredClubs = CLUBS_DATA.filter((club) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Executive & Leadership") {
      return club.roleType === "Executive" || club.roleType === "Leadership";
    }
    if (selectedFilter === "Tech & AI") {
      return (
        club.category.includes("Tech") ||
        club.category.includes("AI") ||
        club.category.includes("Software")
      );
    }
    if (selectedFilter === "Scouting & Social") {
      return (
        club.category.includes("Scouting") ||
        club.category.includes("Social") ||
        club.category.includes("Community")
      );
    }
    return true;
  });

  return (
    <div className="clubs-page container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">🤝 Clubs & Co-Curricular Activities</h1>
        <p className="text-muted">
          Leadership roles, technical societies, scouting brotherhood, and campus community engagement
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* KPI Stats Counters */}
      <div className="row g-3 mb-5">
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm p-3 bg-light rounded-4 h-100">
            <span className="fs-2 mb-1">🏛️</span>
            <h3 className="fw-bold text-dark mb-0">6</h3>
            <p className="text-muted small mb-0 fw-semibold">Active Clubs & Wings</p>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm p-3 bg-primary-subtle rounded-4 h-100 border-primary-subtle">
            <span className="fs-2 mb-1">👑</span>
            <h3 className="fw-bold text-primary mb-0">2</h3>
            <p className="text-primary-emphasis small mb-0 fw-semibold">Executive & Leadership Roles</p>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm p-3 bg-success-subtle rounded-4 h-100 border-success-subtle">
            <span className="fs-2 mb-1">⚜️</span>
            <h3 className="fw-bold text-success mb-0">1</h3>
            <p className="text-success-emphasis small mb-0 fw-semibold">Air Rover Scout Group</p>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm p-3 bg-warning-subtle rounded-4 h-100 border-warning-subtle">
            <span className="fs-2 mb-1">💻</span>
            <h3 className="fw-bold text-warning-emphasis mb-0">3</h3>
            <p className="text-warning-emphasis small mb-0 fw-semibold">Tech & Engineering Clubs</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`btn btn-sm px-4 py-2 rounded-pill fw-semibold shadow-sm transition-all ${
              selectedFilter === cat
                ? "btn-primary text-white"
                : "btn-outline-secondary bg-white text-dark"
            }`}
          >
            {cat === "All" && "🌐 "}
            {cat === "Executive & Leadership" && "👑 "}
            {cat === "Tech & AI" && "💻 "}
            {cat === "Scouting & Social" && "⚜️ "}
            {cat}
          </button>
        ))}
      </div>

      {/* Clubs Cards Grid */}
      <div className="row g-4">
        {filteredClubs.map((club) => (
          <div className="col-lg-6" key={club.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-shadow bg-white d-flex flex-column justify-content-between p-4">
              <div>
                {/* Card Header: Official Logo, Name & Role Badge */}
                <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                  <div className="d-flex align-items-center gap-3">
                    {club.logo ? (
                      <div
                        className="rounded-4 d-flex align-items-center justify-content-center shadow-sm p-2 border bg-white cursor-pointer"
                        style={{
                          width: "72px",
                          height: "72px",
                          flexShrink: 0,
                          cursor: "pointer",
                          transition: "transform 0.2s ease",
                        }}
                        onClick={() => setSelectedLogo({ src: club.logo, name: club.name })}
                        title="Click to view full logo"
                      >
                        <img
                          src={club.logo}
                          alt={club.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="rounded-4 d-flex align-items-center justify-content-center shadow-sm border"
                        style={{
                          width: "72px",
                          height: "72px",
                          fontSize: "2rem",
                          backgroundColor: "#f8f9fa",
                          flexShrink: 0,
                        }}
                      >
                        {club.icon}
                      </div>
                    )}

                    <div>
                      <h4 className="fw-bold card-title mb-1 text-dark fs-5">
                        {club.name}
                      </h4>
                      <p className="text-muted small mb-0">
                        🏛️ {club.org}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Role and Category Badges */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className={`badge ${club.badgeClass} px-3 py-2 fs-6 fw-semibold rounded-pill shadow-sm`}>
                    {club.roleType === "Executive" || club.roleType === "Leadership" ? "👑 " : "⭐ "}
                    {club.role}
                  </span>
                  <span className="badge bg-light text-secondary border px-3 py-2 small rounded-pill">
                    📌 {club.category}
                  </span>
                </div>

                {/* Description */}
                <p className="card-text text-secondary small lh-base mb-3">
                  {club.description}
                </p>

                {/* Key Highlights / Contributions */}
                <div className="bg-light p-3 rounded-3 mb-3">
                  <h6 className="fw-bold small text-dark mb-2">
                    🎯 Key Highlights & Responsibilities:
                  </h6>
                  <ul className="mb-0 ps-3 small text-secondary">
                    {club.highlights.map((h, i) => (
                      <li key={i} className="mb-1">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="d-flex flex-wrap gap-1 pt-2 border-top">
                {club.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="badge bg-white text-muted border small px-2 py-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-size Logo Modal */}
      {selectedLogo && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1055 }}
          onClick={() => setSelectedLogo(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-white border-0 shadow-lg rounded-4 overflow-hidden text-center p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-dark mb-0">{selectedLogo.name}</h5>
                <button
                  type="button"
                  className="btn btn-light rounded-circle px-3 py-1 fw-bold"
                  onClick={() => setSelectedLogo(null)}
                >
                  ✕
                </button>
              </div>
              <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-center">
                <img
                  src={selectedLogo.src}
                  alt={selectedLogo.name}
                  className="img-fluid"
                  style={{ maxHeight: "360px", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Call to Action */}
      <div className="card border-0 bg-light shadow-sm rounded-4 p-4 mt-5 text-center">
        <div className="card-body">
          <h4 className="fw-bold mb-2">Want to Collaborate on Campus or Club Activities? 🚀</h4>
          <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Whether it's organizing tech workshops, participating in scout expeditions, or collaborating on software projects, I'm always eager to connect!
          </p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary px-4 py-2 fw-semibold rounded-pill shadow-sm">
              Connect With Me ✉️
            </Link>
            <Link to="/about" className="btn btn-outline-dark px-4 py-2 fw-semibold rounded-pill">
              View Full Bio & Education 🎓
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubsPage;
