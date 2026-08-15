function SportsHobbiesPage() {
  const sports = [
    {
      title: "Football (Soccer) ⚽",
      role: "Passionate Player & Fan",
      team: "FC Barcelona 🔴🔵 | Lionel Messi Fan",
      description:
        "Football is my greatest sporting passion. I love playing as an attacking midfielder/winger with quick footwork and tactical playmaking. Cheering for Barça in European and domestic leagues is a weekly ritual.",
      icon: "⚽",
      badge: "Favorite Sport",
    },
    {
      title: "Cricket 🏏",
      role: "All-Round Enthusiast",
      team: "Bangladesh National Cricket Team",
      description:
        "Enjoy playing friendly weekend cricket matches with university peers and following international T20 and ODI tournaments.",
      icon: "🏏",
      badge: "Athletics",
    },
    {
      title: "Rover Scouting & Fitness ⚜️",
      role: "Certified Air Scout Leader",
      team: "DIU Air Rover Scout Group",
      description:
        "Active member and certified leader in Bangladesh Scouts, participating in physical agility drills, obstacle courses, community service, and outdoor survival bootcamps.",
      icon: "🏕️",
      badge: "Leadership & Agility",
    },
  ];

  const hobbies = [
    {
      title: "Landscape & Travel Photography 📸",
      description:
        "Capturing scenic moments across Bangladesh — from the rolling hills and clouds of Sajek Valley to the lush tea gardens of Sylhet and the endless horizons of Cox's Bazar beach.",
      icon: "📷",
    },
    {
      title: "Book Reading & Philosophy 📚",
      description:
        "Immersing in Bengali classic literature (Sarat Chandra, Humayun Ahmed, Manik Bandopadhyay) and non-fiction books on productivity, cognitive science, and software craftsmanship.",
      icon: "📖",
    },
    {
      title: "Tech Exploration & AI Tinkering 🤖",
      description:
        "Experimenting with cutting-edge LLMs, Data Science pipelines, predictive analytics models, and developing full-stack web applications for real-world impact.",
      icon: "💻",
    },
    {
      title: "Travelling & Backpacking 🎒",
      description:
        "Exploring diverse cultures, historical landmarks, mountains, rivers, and discovering hidden natural gems with backpacker freedom.",
      icon: "🌍",
    },
  ];

  return (
    <div className="sports-hobbies-page container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">⚽ Sports & Hobbies 🎨</h1>
        <p className="text-muted">
          My athletic passions, outdoor adventures, scouting journey, and creative pursuits
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Sports Section */}
      <div className="mb-5">
        <h3 className="fw-bold mb-4 d-flex align-items-center">
          <span className="me-2">🏆</span> Athletic Passions & Sports
        </h3>
        <div className="row g-4">
          {sports.map((item, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card h-100 shadow-sm border-0 p-4 hover-shadow bg-light">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className="fs-1">{item.icon}</span>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                    {item.badge}
                  </span>
                </div>
                <h4 className="fw-bold card-title mb-1 text-dark">{item.title}</h4>
                <p className="text-primary fw-semibold small mb-2">{item.team}</p>
                <p className="text-secondary small lh-base mb-0">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies & Creative Pursuits */}
      <div>
        <h3 className="fw-bold mb-4 d-flex align-items-center">
          <span className="me-2">🎨</span> Hobbies & Personal Interests
        </h3>
        <div className="row g-4">
          {hobbies.map((hobby, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card h-100 shadow-sm border-0 p-4 hover-shadow">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <span className="fs-2">{hobby.icon}</span>
                  <h4 className="fw-bold card-title mb-0 text-dark">{hobby.title}</h4>
                </div>
                <p className="text-secondary small lh-base mb-0 mt-2">{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SportsHobbiesPage;
