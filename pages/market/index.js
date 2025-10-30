// pages/market/index.js
import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Market() {
  // Title section styles
  const titleSectionStyle = {
    backgroundColor: "#f1f1f1",
    textAlign: "center",
    padding: "80px 20px",
  };

  const titleStyle = {
    fontSize: "40px",
    fontWeight: "700",
    margin: 0,
  };

  const breadcrumbStyle = {
    marginTop: "10px",
    fontSize: "16px",
  };

  const breadcrumbLinkStyle = {
    color: "#43a047",
    textDecoration: "none",
    marginRight: "5px",
  };

  // Content styles
  const containerStyle = {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "0 20px",
    textAlign: "left",
  };

  const messageStyle = {
    marginBottom: "40px",
    fontSize: "16px",
    color: "#333",
  };

  const subcategoryTitleStyle = {
    fontWeight: "700",
    fontSize: "28px",
    marginBottom: "25px",
    color: "#222",
  };

  const subcategoryLinkStyle = {
    fontSize: "20px",
    fontWeight: "700",
    color: "#e64a19", // burnt orange
    marginBottom: "25px",
    textDecoration: "none",
    display: "block",
  };

  return (
    <>
      <Header />

      {/* Title + Breadcrumb */}
      <section style={titleSectionStyle}>
        <h1 style={titleStyle}>Market</h1>
        <div style={breadcrumbStyle}>
          <Link href="/" style={breadcrumbLinkStyle}>
            Home
          </Link>
          <span>/</span>
          <span style={{ fontWeight: "600", marginLeft: "5px" }}>market</span>
        </div>
      </section>

      {/* Main content container */}
      <section style={containerStyle}>
        <p style={messageStyle}>
          There are no articles in this category. If subcategories display on
          this page, they may have articles.
        </p>

        <h2 style={subcategoryTitleStyle}>Subcategories</h2>

        <Link
          href="/market/newasa-main-office-department"
          style={subcategoryLinkStyle}
        >
          Newasa Main Office Department
        </Link>

        <Link
          href="/market/sub-department"
          style={subcategoryLinkStyle}
        >
          Sub Yard Department
        </Link>
      </section>

      <Footer />
    </>
  );
}
