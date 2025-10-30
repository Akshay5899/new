// pages/about-us/about-apmc.js
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AboutAPMC() {
  const data = [
    { name: "Establishment of organization", content: "20/04/1957" },
    { name: "Workspace", content: "Nevasa Taluka" },
    { name: "Main Market Premises", content: "Nevasa" },
    { name: "Organization sub premises", content: "Ghodegaon, Kukana, Sonai" },
    { name: "Total area of ​​organization", content: "Hectare Area" },
    { name: "Nevasa", content: "4 ha 2 r" },
    { name: "Ghodegaon", content: "7 ha 42 r" },
    { name: "Kukana", content: "1 ha 11 r" },
    { name: "Sonai", content: "1 ha 33 r" },
  ];

  // ✅ Title Banner Inline Style
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
        <h1 style={titleStyle}>About APMC</h1>
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
          / <span style={{ fontWeight: "600" }}>About APMC</span>
        </p>
      </div>

      {/* ✅ Table Section */}
      <div className="container mt-5 mb-5">
        {/* Mobile Horizontal Scroll Wrapper */}
        <div
          className="table-responsive"
          style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
        >
          <table
            className="table table-bordered table-striped text-start align-middle shadow-sm"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              minWidth: "500px",
            }}
          >
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <td
                    className="fw-semibold"
                    style={{ width: "50%", color: "#2E7D32" }}
                  >
                    {row.name}
                  </td>
                  <td>{row.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}
