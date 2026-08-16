import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";

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
import ContactPage from "./pages/ContactPage";
import MessagesPage from "./pages/MessagesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/inbox" element={<MessagesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;