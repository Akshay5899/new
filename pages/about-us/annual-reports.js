// pages/about-us/annual-reports.js
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AnnualReports() {
  // ✅ Title Section Styles
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

  return (
    <>
      <Header />

      {/* ✅ Title Section */}
      <div style={bannerStyle}>
        <h1 style={titleStyle}>Annual Reports</h1>
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
          / <span style={{ fontWeight: "600" }}>Annual Reports</span>
        </p>
      </div>

      {/* ✅ Content Section */}
      <div className="container py-5 text-center">
        <p style={{ fontSize: "18px", color: "#333" }}>
          Annual report details will be updated here soon.
        </p>
      </div>

      <Footer />
    </>
  );
}
