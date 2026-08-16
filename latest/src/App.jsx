import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import { API_URL } from "./config/api.js";

// Multi-Page Components
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import LibraryPage from "./pages/LibraryPage";
import CertificatesPage from "./pages/CertificatesPage";
import TourPage from "./pages/TourPage";
import MoviesPage from "./pages/MoviesPage";
import SportsHobbiesPage from "./pages/SportsHobbiesPage";
import ClubsPage from "./pages/ClubsPage";
import ContactPage from "./pages/ContactPage";
import MessagesPage from "./pages/MessagesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotFoundPage from "./pages/NotFoundPage";

// Silent Background Visitor Tracker
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Only track standard pages, avoid spamming analytics itself
    if (location.pathname !== "/analytics" && location.pathname !== "/visitors") {
      fetch(`${API_URL}/api/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: location.pathname,
          referrer: document.referrer || "Direct",
        }),
      }).catch(() => {});
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <PageTracker />
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/tour" element={<TourPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/lifestyle" element={<SportsHobbiesPage />} />
          <Route path="/sports" element={<SportsHobbiesPage />} />
          <Route path="/hobbies" element={<SportsHobbiesPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/clubbing" element={<ClubsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/inbox" element={<MessagesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/visitors" element={<AnalyticsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;