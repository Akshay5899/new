import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SubDepartment() {
  // ✅ Title Section Styles
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

  // ✅ Sub-Market Links
  const subMarkets = [
    { name: "Sonai Sub-Market", link: "/market/sub-department/sonai-sub-department" },
    { name: "Kukana Sub-Market Division", link: "/market/sub-department/kukana-sub-department" },
    { name: "Ghodegaon Sub-Market Division", link: "/market/sub-department/ghodegaon-sub-department" },
  ];

  return (
    <>
      <Header />

      {/* Title + Breadcrumb Section */}
      <section style={titleSectionStyle}>
        <h1 style={titleStyle}>Sub–Market Division</h1>
        <div style={breadcrumbStyle}>
          <Link href="/" style={breadcrumbLinkStyle}>
            Home
          </Link>{" "}
          /{" "}
          <Link href="/market" style={breadcrumbLinkStyle}>
            Market
          </Link>{" "}
          / <span style={{ fontWeight: "600", marginLeft: "5px" }}>
            Sub–Department
          </span>
        </div>
      </section>

      {/* Sub-Market List Section */}
      <section className="container text-center py-5">
        <div
          className="d-flex flex-column align-items-center"
          style={{ gap: "25px" }}
        >
          {subMarkets.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="d-flex justify-content-between align-items-center"
              style={{
                width: "100%",
                maxWidth: "1200px",
                backgroundColor: "#43a047",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "600",
                padding: "25px 30px",
                borderRadius: "10px",
                textDecoration: "none",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#388e3c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#43a047")
              }
            >
              <span>{item.name}</span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                ➜
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
