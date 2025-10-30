// pages/about-us/annual-income.js
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AnnualIncome() {
  const data = [
    { year: "2024–25", income: "7,79,37,734.50", expenditure: "3,85,10,751.30", profit: "3,94,26,983.20" },
    { year: "2023–24", income: "5,94,24,722.50", expenditure: "3,62,03,012.50", profit: "2,32,21,710.00" },
    { year: "2022–23", income: "5,55,58,273.50", expenditure: "3,52,84,573.40", profit: "2,02,73,700.10" },
    { year: "2021–22", income: "6,39,48,696.00", expenditure: "3,63,67,671.95", profit: "2,75,81,024.05" },
    { year: "2020–21", income: "6,29,15,441.50", expenditure: "2,41,43,103.30", profit: "3,87,72,338.20" },
  ];

  // ✅ Inline styles for title banner
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
        <h1 style={titleStyle}>Annual Income</h1>
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
          / <span style={{ fontWeight: "600" }}>Annual Income</span>
        </p>
      </div>

      {/* ✅ Table Section */}
      <div className="container py-5">
        <div className="table-responsive">
          <table
            className="table text-center align-middle mb-0"
            style={{
              borderCollapse: "collapse",
              border: "1px solid #dee2e6",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#ff9200d4",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <th style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                  Financial Year
                </th>
                <th style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                  Annual Income (₹)
                </th>
                <th style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                  Expenditure (₹)
                </th>
                <th style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                  Profit / Loss (₹)
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.year}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#fff6e9", // alternate rows
                  }}
                >
                  <td
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "10px",
                      fontWeight: "500",
                    }}
                  >
                    {item.year}
                  </td>
                  <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                    {item.income}
                  </td>
                  <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                    {item.expenditure}
                  </td>
                  <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                    {item.profit}
                  </td>
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
