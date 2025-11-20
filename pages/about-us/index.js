// pages/about-us/index.js
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import boardDirectors from "../../data/boardDirectors";

export default function AboutUs() {
  const membersToShow = boardDirectors.slice(0, 3);

  const committeeData = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    name: "Mr. Udaysing Ramsing Rajput",
    department: "Government Departments",
    contact: "Mo. 91 88888 88888",
  }));

  return (
    <>
      <Header />

      {/* About Section */}
      <section className="ab-home container py-5">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="mb-3 fw-bold">About the Organization</h2>
            <p>
              APMC (Agricultural Produce Market Committee) provides a secure and
              transparent platform for farmers to sell their produce and traders to
              buy it, ensuring fair trade and protecting farmers’ rights.
            </p>
            <h5 className="mt-4 fw-semibold">Main Functions of APMC:</h5>
            <h5 className="fw-semibold mb-2">For Farmers:</h5>
            <p>
              The right place to sell the product provides a safe and proper place for selling goods to the APMC farmers. Information on market prices provides information on market prices to APMC farmers, so that they can get the right rates for their goods. Protection from exploitation protects the farmers from the exploitation of APMC traders. The protection of the rights APMC protects the farmers' rights and provides them with proper justice.
            </p>
            <p>
              The right place to sell the product provides a safe and proper place for selling goods to the APMC farmers. Information on market prices provides information on market prices to APMC farmers, so that they can get the right rates for their goods. Protection from exploitation protects the farmers from the exploitation of APMC traders. The protection of the rights APMC protects the farmers' rights and provides them with proper justice.
            </p>
          </div>
          <div className="col-md-6 text-center pb-3">
            <img
              src="/About-Agri-Commodities.png"
              alt="Agricultural Market"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="text-center pb-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container-fluid p-0">
          <div
            className="py-3"
            style={{
              backgroundColor: "#00A24F",
            }}
          >
            <h2 className="fw-bold text-white">Our Team</h2>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row justify-content-center">
            {membersToShow.map((member, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center"
              >
                <div
                  className="card shadow-sm p-3 border-0 text-center"
                  style={{
                    maxWidth: "22rem",
                    borderRadius: "10px",
                    backgroundColor: "#F9F9F9",
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="mx-auto d-block"
                    style={{
                      maxWidth: "160px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="fw-semibold" style={{ color: "#551262" }}>
                      {member.name}
                    </h5>
                    <p className="text-muted mb-0">{member.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Structure Section */}
      <section className="committee-section" >
        <div className="container-fluid p-0">
          <div
            className="py-3 text-center"
            style={{
              backgroundColor: "#00A24F",
            }}
          >
            <h2 className="fw-bold text-white">Committee Structure</h2>
          </div>
        </div>

        <div className="container mt-4">
          <div className="table-responsive">
            <table
              className="table text-center align-middle"
              style={{
                minWidth: "600px", // ensures scroll appears on small screens
                fontSize: "16px",
                color: "#0B0B0B",
              }}
            >
              <tbody>
                {committeeData.map((row) => (
                  <tr key={row.id}>
                    <td style={{ width: "5%" }}>{String(row.id).padStart(2, "0")}</td>
                    <td style={{ width: "45%" }}>{row.name}</td>
                    <td style={{ width: "30%" }}>{row.department}</td>
                    <td style={{ width: "20%" }}>{row.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

{/* Mission & Vision Section */}
<section className="mission-vision py-5" style={{ backgroundColor: "#fff" }}>
  <div className="container" style={{ maxWidth: "900px" }}>
    <div className="row justify-content-center text-center align-items-stretch gy-3">
      {/* Mission */}
      <div className="col-md-5 mb-4 d-flex">
        <div className="mv-box position-relative p-4 flex-fill">
          <div className="mv-title bg-white px-3 py-1 position-absolute">
            <h2 className="fw-bold">Our Mission</h2>
          </div>
          <p className="mt-4 text-dark">
            To create a transparent, efficient, and farmer-friendly marketplace by
            providing modern infrastructure, fair trading practices, and digital
            access to information.
          </p>
        </div>
      </div>

      {/* Vision */}
      <div className="col-md-5 mb-4 d-flex">
        <div className="mv-box position-relative p-4 flex-fill">
          <div className="mv-title bg-white px-3 py-1 position-absolute">
            <h2 className="fw-bold">Our Vision</h2>
          </div>
          <p className="mt-4 text-dark">
            Empowering farmers and traders through innovation, technology, and trust
            — building a sustainable agricultural market ecosystem.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


{/* Goal Section */}
<section
  className="goal pb-5"
>
  <div className="container p-5" style={{
    background: "radial-gradient(50% 50% at 50% 50%, #03AD55 0%, #00A24F 100%)",
    color: "#fff", 
  }}>
    <p
      className="mb-0"
      style={{
        fontSize: "1.8rem", // slightly smaller than fs-5
        color: "#fff",
        fontWeight: 500,
      }}
    >
      Our goal is to ensure that every farmer gets the right price for their
      produce through a transparent and efficient system. We are committed to
      building a digital, farmer-friendly market.
    </p>
    <p
      className="mt-3 mb-0 text-end"
      style={{
        color: "#fff", // small italic text
      }}
    >
      – Chairman, Market Committee
    </p>
  </div>
</section>


      <Footer />

      {/* Combined Styles */}
      <style jsx>{`
        .committee-section table tr
        {
          border-bottom: 1px solid #55126233;
        }
        .committee-section table tr td {
          padding: 0.75rem 1rem;
          vertical-align: middle;
        }
        .committee-section table tr td:first-child {
          font-weight: 600;
        }
        .mv-box {
          background-color: #F0FFF4;
          border-radius: 10px;
          padding-top: 40px; /* space for title */
          min-height: 180px;
          position: relative;
        }
        .mv-title {
          top: -15px;
          width: max-content;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 600;
          border-radius: 20px;
          font-size: 18px;
        }
        .mv-box p {
          margin-top: 15px;
          line-height: 1.6;
        }
        .mission-vision .shadow-sm {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </>
  );
}
