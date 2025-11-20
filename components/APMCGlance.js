import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Link from "next/link";
import { stats, auctionData, tenders, circulars, rti } from "../data/apmcData";

const APMCGlance = () => {
  const [newsData, setNewsData] = useState([]);

  // ✅ Fetch Dummy API Data
  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNewsData(
          data.slice(0, 5).map((item, index) => ({
            id: item.id,
            slug:
              item.slug ||
              item.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
            date: "Sun, " + (index + 1) + " Jun 2025",
            title: item.title.charAt(0).toUpperCase() + item.title.slice(1),
          }))
        );
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <section className="py-5 text-center" style={{ backgroundColor: "#F9F9F9" }}>
      <div className="container">
        <h2 className="mb-4">APMC at a glance</h2>

        <div className="row justify-content-center mb-5 apmc-stats-row">
          {stats.map((item, idx) => (
            <div key={idx} className="col-6 col-sm-4 col-md-2 mb-4">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={item.icon}
                  alt={item.label}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <h5 className="mb-0">{item.label}</h5>
                <h5>{item.value}</h5>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-4">
          <Tabs
            defaultActiveKey="timetable"
            id="apmc-tabs"
            className="mb-3 custom-tabs"
          >
            {/* 🔹 Auction Timetable */}
            <Tab eventKey="timetable" title="Auction Timetable">
              <div className="table-responsive">
                <table className="table table-bordered text-start custom-table">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Type of Agricultural Produce & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auctionData.map((row, idx) => (
                      <tr key={idx}>
                        <td>
                          <strong>{row.day}</strong>
                        </td>
                        <td>
                          {row.types.map((type, i) => (
                            <div key={i}>{type}</div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab>

            {/* 🔹 News Tab */}
            <Tab eventKey="news" title="News">
              <div className="mt-3">
                {newsData.length === 0 ? (
                  <p>Loading news...</p>
                ) : (
                  newsData.map((item) => (
                    <div
                      key={item.id}
                      className="text-start border rounded p-3 mb-3"
                      style={{ borderColor: "#0a5c2a" }}
                    >
                      <div className="d-flex align-items-center mb-2 text-muted">
                        <i className="bi bi-calendar-event me-2"></i>
                        {item.date}
                      </div>

                      {/* ✅ Link to single news page */}
                      <Link
                        href={`/news/${item.slug}`}
                        className="fw-bold text-success text-decoration-none"
                      >
                        {item.title}
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </Tab>

            {/* 🔹 Tenders Tab */}
            <Tab eventKey="tenders" title="Tenders">
              <div className="mt-3">
                {tenders.map((item) => (
                  <div
                    key={item.id}
                    className="text-start border rounded p-3 mb-3"
                    style={{ borderColor: "#0a5c2a" }}
                  >
                    <div className="d-flex align-items-center mb-2 text-muted">
                      <i className="bi bi-calendar-event me-2"></i>
                      {item.date}
                    </div>
                    <h5 className="mb-1">{item.title}</h5>
                    <div>
                      <a
                        href={item.link}
                        className="text-success fw-bold me-3"
                      >
                        View
                      </a>
                      <a href={item.download} className="text-success fw-bold">
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Tab>

            {/* 🔹 Circulars Tab */}
            <Tab eventKey="circulars" title="Circulars">
              <div className="mt-3">
                {circulars.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex flex-column flex-md-row justify-content-between align-items-center border rounded p-3 mb-3"
                    style={{ borderColor: "#0a5c2a" }}
                  >
                    <div>
                      <h5 className="mb-1 text-success fw-bold">
                        {item.title}
                      </h5>
                      <p className="mb-0 text-muted">{item.subtitle}</p>
                    </div>
                    <div>
                      <a
                        href={item.view}
                        className="text-success fw-bold me-3"
                      >
                        View
                      </a>
                      <a
                        href={item.download}
                        className="text-success fw-bold"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Tab>

            {/* 🔹 RTI Tab */}
            <Tab eventKey="rti" title="RTI">
              <div className="mt-3">
                {rti.map((item) => (
                  <div
                    key={item.id}
                    className="text-start border rounded p-3 mb-3"
                    style={{ borderColor: "#0a5c2a" }}
                  >
                    <div className="d-flex align-items-center mb-2 text-muted">
                      <i className="bi bi-calendar-event me-2"></i>
                      {item.date}
                    </div>
                    <p className="mb-1 fw-bold">{item.title}</p>
                    <div>
                      <a
                        href={item.view}
                        className="text-success fw-bold me-3"
                      >
                        View
                      </a>
                      <a
                        href={item.download}
                        className="text-success fw-bold"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default APMCGlance;
