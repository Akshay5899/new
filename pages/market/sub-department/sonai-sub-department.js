// pages/market/sub-department/sonai-sub-department.js
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SonaiSubDepartment() {
  // ✅ Title Section
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

  // ✅ Content Section
  const sectionStyle = {
    backgroundColor: "#ffffff",
    padding: "50px 20px",
    borderBottom: "5px solid #4caf50",
  };

  const headingStyle = {
    color: "#3a933a",
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px",
  };

  const listContainer = {
    textAlign: "left",
    margin: "0 auto 20px 20px",
    paddingLeft: "0",
    listStyleType: "none",
  };

  const listItemStyle = {
    color: "#000",
    fontSize: "15px",
    padding: "6px 0",
    display: "flex",
    alignItems: "center",
  };

  const arrowStyle = {
    color: "#4caf50",
    marginRight: "8px",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <>
      <Header />

      {/* ✅ Title Section */}
      <div style={bannerStyle}>
        <h1 style={titleStyle}>Sonai Sub Department</h1>
        <p style={breadcrumbStyle}>
          <a href="/" style={{ color: "#00A24F", textDecoration: "none" }}>
            Home
          </a>{" "}
          /{" "}
          <a href="/market" style={{ color: "#00A24F", textDecoration: "none" }}>
            Market
          </a>{" "}
          /{" "}
          <a
            href="/market/sub-department"
            style={{ color: "#00A24F", textDecoration: "none" }}
          >
            Sub Department
          </a>{" "}
          / <span style={{ fontWeight: "600" }}>Sonai Sub Department</span>
        </p>
      </div>

      {/* ✅ Content Section */}
      <div style={sectionStyle}>
        <div className="container">
          <h2 style={headingStyle}>Sonai Sub Market Department</h2>

          <ul style={listContainer}>
            {["Warehouse"].map((item, index) => (
              <li key={index} style={listItemStyle}>
                <span style={arrowStyle}>➤</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}
