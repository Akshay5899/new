// pages/about-us/organizational-management.js
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OrganizationalManagement() {
  const data = [
    {
      department: "Secretary",
      head: "Hon. Mr. D.R. Palave",
      post: "Secretary",
      contact: "9881819700",
      email: "",
      photo: "/Board_All.png",
    },
    {
      department: "Head of Accounts Department",
      head: "Hon. Mr. S.A. Makone",
      post: "Accountant",
      contact: "9689696777",
      email: "",
      photo: "/Board_All.png",
    },
    {
      department: "Onion Department",
      head: "Hon. Mr. S.M. Bhawar",
      post: "Inspector",
      contact: "9420641883",
      email: "",
      photo: "/Board_All.png",
    },
    {
      department: "Animal Department",
      head: "Hon. Mr. R.R. Chaudhary",
      post: "Clerk",
      contact: "9422290367",
      email: "",
      photo: "/Board_All.png",
    },
    {
      department: "Bhusar Department",
      head: "Hon. Mr. A.B. Gaikwad",
      post: "Clerk",
      contact: "9096342761",
      email: "",
      photo: "/Board_All.png",
    },
  ];

  // ✅ Title section style
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
        <h1 style={titleStyle}>Organizational Management</h1>
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
          / <span style={{ fontWeight: "600" }}>Organizational Management</span>
        </p>
      </div>

      {/* ✅ Table Section */}
      <div className="container py-5">
        <div className="table-responsive">
          <table
            className="table align-middle text-start"
            style={{
              borderCollapse: "collapse",
              border: "1px solid #dee2e6",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#006400", color: "white" }}>
                <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Department
                </th>
                <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Department Head
                </th>
                <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Post
                </th>
                <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Contact
                </th>
                <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Email
                </th>
                <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Photo
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f5fff2",
                  }}
                >
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    {item.department}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    {item.head}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    {item.post}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    {item.contact}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    {item.email || "-"}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    <img
                      src={item.photo}
                      alt={item.head}
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        border: "1px solid #ddd",
                        padding: "5px",
                        backgroundColor: "#fff",
                      }}
                    />
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
