import { useState } from "react";
import { API_URL } from "../../config/api.js";

function Contact() {
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
          message: data.message || "Message sent successfully! 🎉",
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
        message: "Server is unreachable. Please verify the backend is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-5" id="contact">
      <div className="text-center">
        <h2 className="fw-bold">Contact Me</h2>
        <hr className="w-25 mx-auto" />
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-8 col-lg-6">
          {status.message && (
            <div className={`alert alert-${status.type} alert-dismissible fade show`} role="alert">
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card shadow-sm p-4 border-0">
            <div className="mb-3">
              <label className="form-label fw-semibold">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control"
                placeholder="Project Inquiry / Feedback"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                rows="4"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending Message...
                </>
              ) : (
                "Send Message 🚀"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;