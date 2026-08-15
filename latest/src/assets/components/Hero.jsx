function Hero() {
  return (
    <div className="container py-5 text-center">
      <div className="banerimage mb-4">
        <img
          src="/hasu.jpeg"
          alt="Abu Jakaria Hasu"
          className="rounded-circle shadow"
          style={{ width: "160px", height: "160px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "/jakaria.jpeg";
          }}
        />
      </div>
      <h1 className="fw-bold display-5">Abu Jakaria Hasu</h1>
      <p className="lead text-primary fw-semibold">
        Full Stack Web Developer | React & Node.js | Aspiring Data Scientist
      </p>
      <p className="text-muted">
        Software Engineering Student at Daffodil International University. Passionate about building modern, scalable, high-performance, and responsive web applications while exploring Data Science and Machine Learning.
      </p>
    </div>
  );
}

export default Hero;