// pages/about-us/index.js
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AboutUs() {
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

  const contentStyle = {
    fontSize: "18px",
    color: "#333",
    lineHeight: "1.7",
    textAlign: "justify",
  };

  return (
    <>
      <Header />

      {/* ✅ Title Section */}
      <div style={bannerStyle}>
        <h1 style={titleStyle}>About Us</h1>
        <p style={breadcrumbStyle}>
          <a href="/" style={{ color: "#00A24F", textDecoration: "none" }}>
            Home
          </a>{" "}
          / <span style={{ fontWeight: "600" }}>About Us</span>
        </p>
      </div>

      {/* ✅ About Content */}
      <div className="container py-5">
        <p style={contentStyle}>
          The Agricultural Produce Market Committee (APMC), Nevasa, was
          established with the objective of providing fair marketing facilities
          to farmers and traders. It operates under the Maharashtra Agricultural
          Produce Marketing (Development and Regulation) Act, and works to
          ensure transparent trading, standardized weighing, and prompt payment
          to farmers.
        </p>

        <p style={contentStyle}>
          The APMC manages several sub-markets in Nevasa, including Ghodegaon,
          Kukana, and Sonai, ensuring equal opportunities for farmers across the
          region. Our committee is dedicated to the welfare of farmers,
          promoting organized market practices, and supporting agricultural
          development.
        </p>

        <p style={contentStyle}>
          Through initiatives like digital record keeping, online auctions, and
          improved infrastructure, APMC Nevasa continues to modernize its
          operations for the benefit of the agricultural community.
        </p>
      </div>

      <Footer />
    </>
  );
}
