// pages/about-us/departments.js
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function DepartmentsPage() {
  const departments = [
    "Department 1",
    "Department 2",
    "Department 3",
    "Department 4",
    "Department 5",
    "Department 6",
    "Department 7",
    "Department 8",
    "Department 9",
    "Department 10",
  ];

  // ✅ Banner Section
  const bannerStyle = {
    background: "#f2f2f2",
    textAlign: "center",
    padding: "70px 20px",
  };

  const titleStyle = {
    fontSize: "40px",
    fontWeight: "700",
    margin: "0",
    color: "#000",
  };

  const breadcrumbStyle = {
    marginTop: "12px",
    fontSize: "16px",
    color: "#000",
    opacity: "0.9",
  };

  // ✅ Departments Section
  const sectionStyle = {
    backgroundColor: "#ffffff",
    padding: "60px 20px",
    textAlign: "center",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  };

  const boxStyle = {
    background:
      "linear-gradient(270deg, #75C35E 0%, #5DB353 50%, #45A347 100%)",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "12px",
    padding: "15px 30px",
    textAlign: "center",
    minWidth: "260px",
    fontSize: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const boxHoverStyle = {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
  };

  return (
    <>
      <Header />

      {/* ✅ Title Banner */}
      <div style={bannerStyle}>
        <h1 style={titleStyle}>Departments</h1>
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
          / <span style={{ fontWeight: "600" }}>Departments</span>
        </p>
      </div>

      {/* ✅ Departments Grid */}
      <div style={sectionStyle}>
        <div style={containerStyle}>
          {departments.map((dept, index) => (
            <div
              key={index}
              style={boxStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, boxHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, boxStyle)}
            >
              {dept}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
