// pages/about-us/board-of-directors.js
import boardDirectors from "../../data/boardDirectors";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BoardOfDirectors() {
  // ✅ Title Banner Inline Styles
  const bannerStyle = {
    background: "#f2f2f2",
    textAlign: "center",
    padding: "70px 20px",
  };

  const titleStyle = {
    fontSize: "40px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#000",
  };

  const breadcrumbStyle = {
    fontSize: "16px",
    color: "#000",
    opacity: "0.9",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "25rem",
    alignItems: "center",
    borderRadius: "10px",
    backgroundColor: "#F9F9F9",
    padding: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  };

  const imgStyle = {
    height: "auto",
    width: "100%",
    maxWidth: "220px",
    objectFit: "cover",
    borderRadius: "8px",
  };

  return (
    <>
      <Header />

      {/* ✅ Title Section */}
      <div style={bannerStyle}>
        <h1 style={titleStyle}>Board of Directors</h1>
        <p style={breadcrumbStyle}>
          <a href="/" style={{ color: "#00A24F", textDecoration: "none" }}>
            Home
          </a>{" "}
          /{" "}
          <a
            href="/about-us"
            style={{ color: "#00A24F", textDecoration: "none" }}
          >
            About Us
          </a>{" "}
          / <span style={{ fontWeight: "600" }}>Board of Directors</span>
        </p>
      </div>

      {/* ✅ Directors Section */}
      <div className="container py-5 text-center">
        <div className="row justify-content-center g-4">
          {boardDirectors.map((member, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
            >
              <div style={cardStyle}>
                <img src={member.image} alt={member.name} style={imgStyle} />
                <h5
                  className="mt-3"
                  style={{ fontWeight: "600", color: "#0b3d2e" }}
                >
                  {member.name}
                </h5>
                <p style={{ color: "#4d4d4d", marginBottom: "0" }}>
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
