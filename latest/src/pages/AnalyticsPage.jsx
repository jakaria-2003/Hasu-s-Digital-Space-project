import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api.js";

function AnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = () => {
    setLoading(true);
    fetch(`${API_URL}/api/track`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch analytics");
        return res.json();
      })
      .then((data) => {
        setStats(data.data || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading analytics:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="analytics-page container py-5">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold display-6 mb-1">📊 Live Visitor Analytics & Traffic</h1>
          <p className="text-muted mb-0">
            Real-time tracking of visitor traffic, devices, geographic cities, and page views
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            onClick={fetchAnalytics}
            className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
            disabled={loading}
          >
            🔄 Refresh Stats
          </button>
          <Link to="/messages" className="btn btn-primary d-inline-flex align-items-center gap-2">
            📬 View Inbox
          </Link>
        </div>
      </div>

      <hr className="mb-4" />

      {loading && (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Fetching real-time visitor metrics from TiDB Cloud...</p>
        </div>
      )}

      {!loading && stats && (
        <>
          {/* Key Metric Counters */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4 bg-primary text-white rounded-4 hover-shadow">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-white-50 text-uppercase fw-bold mb-1 small">Total Page Views</h6>
                    <h2 className="display-5 fw-bold mb-0">{stats.totalViews}</h2>
                  </div>
                  <div className="fs-1 opacity-75">👁️</div>
                </div>
                <small className="text-white-50 mt-2 d-block">Across all portfolio pages</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4 bg-dark text-white rounded-4 hover-shadow">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-white-50 text-uppercase fw-bold mb-1 small">Unique Visitors</h6>
                    <h2 className="display-5 fw-bold mb-0">{stats.uniqueVisitors}</h2>
                  </div>
                  <div className="fs-1 opacity-75">👥</div>
                </div>
                <small className="text-white-50 mt-2 d-block">Distinct visitor devices / IPs</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4 bg-success text-white rounded-4 hover-shadow">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-white-50 text-uppercase fw-bold mb-1 small">Today's Visits</h6>
                    <h2 className="display-5 fw-bold mb-0">{stats.todayViews}</h2>
                  </div>
                  <div className="fs-1 opacity-75">⚡</div>
                </div>
                <small className="text-white-50 mt-2 d-block">Active today</small>
              </div>
            </div>
          </div>

          {/* Breakdown Grids */}
          <div className="row g-4 mb-5">
            {/* Top Visited Pages */}
            <div className="col-lg-4">
              <div className="card shadow-sm border-0 h-100 p-4 rounded-4 bg-light">
                <h5 className="fw-bold mb-3 text-dark">📑 Top Visited Pages</h5>
                {stats.topPages.length === 0 ? (
                  <p className="text-muted small">No page views recorded yet.</p>
                ) : (
                  <ul className="list-group list-group-flush bg-transparent">
                    {stats.topPages.map((p, idx) => (
                      <li
                        key={idx}
                        className="list-group-item bg-transparent d-flex justify-content-between align-items-center px-0 py-2 border-bottom"
                      >
                        <span className="fw-semibold text-dark small font-monospace">
                          {p.page || "/"}
                        </span>
                        <span className="badge bg-primary rounded-pill">{p.views} views</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Top Locations */}
            <div className="col-lg-4">
              <div className="card shadow-sm border-0 h-100 p-4 rounded-4 bg-light">
                <h5 className="fw-bold mb-3 text-dark">🌍 Visitor Locations</h5>
                {stats.topLocations.length === 0 ? (
                  <p className="text-muted small">No location data yet.</p>
                ) : (
                  <ul className="list-group list-group-flush bg-transparent">
                    {stats.topLocations.map((loc, idx) => (
                      <li
                        key={idx}
                        className="list-group-item bg-transparent d-flex justify-content-between align-items-center px-0 py-2 border-bottom"
                      >
                        <span className="fw-semibold text-dark small">
                          📍 {loc.city || "Dhaka"}, {loc.country || "Bangladesh"}
                        </span>
                        <span className="badge bg-success rounded-pill">{loc.count} visits</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Devices & Browsers */}
            <div className="col-lg-4">
              <div className="card shadow-sm border-0 h-100 p-4 rounded-4 bg-light">
                <h5 className="fw-bold mb-3 text-dark">📱 Device Breakdown</h5>
                {stats.deviceStats.length === 0 ? (
                  <p className="text-muted small">No device data yet.</p>
                ) : (
                  <ul className="list-group list-group-flush bg-transparent">
                    {stats.deviceStats.map((d, idx) => (
                      <li
                        key={idx}
                        className="list-group-item bg-transparent d-flex justify-content-between align-items-center px-0 py-2 border-bottom"
                      >
                        <span className="fw-semibold text-dark small">{d.device || "Desktop 💻"}</span>
                        <span className="badge bg-dark rounded-pill">{d.count} hits</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Recent 30 Live Visits Table */}
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0 text-dark">🕒 Real-Time Visitor Logs (Recent 30 Visits)</h5>
              <span className="badge bg-light text-secondary border">Auto-Updated</span>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Time</th>
                    <th>Page Visited</th>
                    <th>Device & OS</th>
                    <th>Browser</th>
                    <th>Location / City</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentVisits.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No visits recorded yet. Visits will appear here live!
                      </td>
                    </tr>
                  ) : (
                    stats.recentVisits.map((v) => (
                      <tr key={v.id}>
                        <td className="small text-muted">
                          {new Date(v.created_at).toLocaleString()}
                        </td>
                        <td>
                          <span className="badge bg-primary-subtle text-primary border border-primary-subtle font-monospace">
                            {v.page || "/"}
                          </span>
                        </td>
                        <td className="small fw-semibold text-dark">
                          {v.device} ({v.os || "Unknown OS"})
                        </td>
                        <td className="small text-secondary">{v.browser || "Browser"}</td>
                        <td className="small">
                          📍 {v.city || "Dhaka"}, {v.country || "Bangladesh"}
                        </td>
                        <td className="small text-muted font-monospace">
                          {v.ip_address ? v.ip_address.substring(0, 15) : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AnalyticsPage;
