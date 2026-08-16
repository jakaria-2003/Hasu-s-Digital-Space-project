import { useState, useEffect } from "react";
import { API_URL } from "../config/api.js";

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMessages = () => {
    setLoading(true);
    fetch(`${API_URL}/api/contacts`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch messages");
        return res.json();
      })
      .then((data) => {
        setMessages(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading messages:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="messages-page container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold display-6 mb-1">📬 Received Messages Inbox</h1>
          <p className="text-muted mb-0">
            Real-time messages sent from your Contact form directly stored in TiDB Cloud MySQL
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="btn btn-outline-primary d-inline-flex align-items-center gap-2 align-self-start align-self-md-center"
          disabled={loading}
        >
          🔄 Refresh Inbox
        </button>
      </div>

      <hr className="mb-4" />

      {/* Search & Stats Bar */}
      <div className="row g-3 align-items-center mb-4">
        <div className="col-md-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input
              type="text"
              className="form-control border-start-0 py-2"
              placeholder="Search by sender name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="col-md-6 text-md-end">
          <span className="badge bg-primary fs-6 px-3 py-2">
            Total Messages: {messages.length}
          </span>
        </div>
      </div>

      {loading && (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Connecting to TiDB Cloud and loading messages...</p>
        </div>
      )}

      {!loading && filteredMessages.length === 0 && (
        <div className="card shadow-sm border-0 p-5 text-center my-4 bg-light">
          <div className="fs-1 mb-2">📭</div>
          <h4 className="fw-bold text-dark">No messages found</h4>
          <p className="text-muted">
            {searchTerm
              ? `No messages matched "${searchTerm}".`
              : "When visitors submit the contact form, their messages will appear here instantly."}
          </p>
        </div>
      )}

      {/* Messages List */}
      <div className="row g-4">
        {filteredMessages.map((msg) => (
          <div className="col-12" key={msg.id}>
            <div className="card shadow-sm border-0 overflow-hidden hover-shadow">
              <div className="card-header bg-white border-bottom py-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
                <div>
                  <h5 className="fw-bold mb-0 text-dark">👤 {msg.name}</h5>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-primary small text-decoration-none fw-semibold"
                  >
                    ✉️ {msg.email}
                  </a>
                </div>

                <div className="text-sm-end">
                  <span className="badge bg-light text-secondary border small">
                    📅 {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="card-body p-4">
                {msg.subject && (
                  <h6 className="fw-bold text-dark mb-2">
                    📌 Subject: <span className="text-secondary fw-normal">{msg.subject}</span>
                  </h6>
                )}

                <div className="p-3 bg-light rounded-3 border-start border-3 border-primary">
                  <p className="mb-0 text-dark lh-base" style={{ whiteSpace: "pre-wrap" }}>
                    {msg.message}
                  </p>
                </div>
              </div>

              <div className="card-footer bg-white border-0 pt-0 pb-3 d-flex justify-content-end">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                    msg.subject || "Your message on Hasu's Digital Space"
                  )}`}
                  className="btn btn-sm btn-primary fw-semibold d-inline-flex align-items-center gap-2"
                >
                  Reply via Email ✉️
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessagesPage;
