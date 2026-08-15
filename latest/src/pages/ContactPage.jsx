import { useState } from "react";
import { API_URL } from "../config/api.js";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: data.message || "Thank you! Your message has been received. 📬",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "danger",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus({
        type: "danger",
        message: "Unable to reach server. Please ensure backend is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Get In Touch ✉️</h1>
        <p className="text-muted">Have a project idea, feedback, or want to collaborate? Send me a message!</p>
        <hr className="w-25 mx-auto" />
      </div>

      <div className="row g-5 justify-content-center">
        {/* Contact Info Cards */}
        <div className="col-lg-5">
          <h3 className="fw-bold mb-4">Contact Information</h3>
          <p className="text-muted mb-4">
            Feel free to reach out directly through this form. Messages are saved directly to my database and I will respond as soon as possible.
          </p>

          <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
            <div className="fs-2 me-3 text-primary">📍</div>
            <div>
              <h6 className="fw-bold mb-0">Location</h6>
              <p className="text-muted mb-0 small">Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
            <div className="fs-2 me-3 text-success">🎓</div>
            <div>
              <h6 className="fw-bold mb-0">University</h6>
              <p className="text-muted mb-0 small">Daffodil International University (DIU)</p>
            </div>
          </div>

          <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
            <div className="fs-2 me-3 text-warning">⚡</div>
            <div>
              <h6 className="fw-bold mb-0">Availability</h6>
              <p className="text-muted mb-0 small">Open for Web Development Opportunities & Projects</p>
            </div>
          </div>

          <div className="d-flex align-items-center p-3 bg-primary-subtle border border-primary-subtle rounded-3 shadow-sm">
            <div className="fs-2 me-3 text-primary">💼</div>
            <div className="flex-grow-1">
              <h6 className="fw-bold mb-0 text-dark">LinkedIn Profile</h6>
              <a
                href="https://www.linkedin.com/in/abu-jakaria-hasu-84024a339"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary small fw-semibold text-decoration-none"
              >
                in/abu-jakaria-hasu-84024a339 ↗
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-4 rounded-4">
            <h3 className="fw-bold mb-4">Send a Direct Message</h3>

            {status.message && (
              <div className={`alert alert-${status.type} alert-dismissible fade show`} role="alert">
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control py-2"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control py-2"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control py-2"
                    placeholder="Project Inquiry / Job Opportunity / Greeting"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control py-2"
                    rows="5"
                    placeholder="Write your message details here..."
                    required
                  ></textarea>
                </div>

                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 fw-bold shadow-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Sending to Database...
                      </>
                    ) : (
                      "Send Message Now 🚀"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
