import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container py-5 text-center my-5">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="fw-bold mb-3">Page Not Found</h2>
      <p className="text-muted mb-4">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary px-4 py-2">
        ← Return to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
