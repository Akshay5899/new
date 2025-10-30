import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DailyMarketPrice() {
  // ✅ Title Section (same as Ghodegaon)
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

  // ✅ Market Card Data
  const markets = [
    {
      label: "Vegetable Market",
      img: "/vegetable.png",
      link: "https://apmcmumbai.org/bajarbhav/daily-bajarbhav-dates/veg",
    },
    {
      label: "Fruit Market",
      img: "/fruits.png",
      link: "https://apmcmumbai.org/bajarbhav/daily-bajarbhav-dates/fruit",
    },
    {
      label: "Dhanya Market",
      img: "/Grain.png",
      link: "https://apmcmumbai.org/bajarbhav/daily-bajarbhav-dates/dhanya",
    },
    {
      label: "Masala Market",
      img: "/Spice.png",
      link: "https://apmcmumbai.org/bajarbhav/daily-bajarbhav-dates/masala",
    },
    {
      label: "Turbhe Market",
      img: "/onion-potato.png",
      link: "https://apmcmumbai.org/bajarbhav/daily-bajarbhav-dates/turbhe",
    },
  ];

  return (
    <>
      <Header />

      {/* ✅ Title Section */}
      <div style={bannerStyle}>
        <h1 style={titleStyle}>Daily Market Price</h1>
        <p style={breadcrumbStyle}>
          <a href="/" style={{ color: "#00A24F", textDecoration: "none" }}>
            Home
          </a>{" "}
          / <span style={{ fontWeight: "600" }}>Daily Market Price</span>
        </p>
      </div>

      {/* ✅ Market Cards Section */}
      <div className="market-section">
        <div className="container">
          <div className="market-grid">
            {markets.map((market, i) => (
              <a
                key={i}
                href={market.link}
                style={{ textDecoration: "none" }}
              >
                <div className="market-card">
                  <img src={market.img} alt={market.label} />
                  <p>{market.label}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* ✅ Inline CSS for Responsive Grid */}
      <style jsx>{`
        .market-section {
          background: #fff;
          border-bottom: 5px solid #4caf50;
          padding: 60px 20px;
        }

        .market-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px; /* ✅ smaller gap */
          justify-items: center;
        }

        .market-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          padding: 35px 20px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          width: 270px; /* ✅ increased card width */
        }

        .market-card img {
          height: 100px;
          margin-bottom: 15px;
        }

        .market-card p {
          font-weight: 600;
          color: #3a933a;
          font-size: 17px;
          margin: 0;
        }

        .market-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }

        /* ✅ Responsive Breakpoints */
        @media (max-width: 1200px) {
          .market-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 992px) {
          .market-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .market-card {
            width: 220px;
          }
        }

        @media (max-width: 576px) {
          .market-grid {
            grid-template-columns: repeat(1, 1fr);
          }
          .market-card {
            width: 250px;
          }
        }
      `}</style>
    </>
  );
}
