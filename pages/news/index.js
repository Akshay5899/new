import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// ✅ Banner section (like "Nevasa Main Office Department")
function NewsBanner() {
  const bannerStyle = {
    background: "#f5f5f5",
    textAlign: "center",
    padding: "80px 20px",
  };

  const titleStyle = {
    fontSize: "42px",
    fontWeight: "700",
    color: "#000",
    marginBottom: "10px",
  };

  const breadcrumbStyle = {
    fontSize: "18px",
  };

  const linkStyle = {
    color: "#34a853",
    textDecoration: "none",
  };

  return (
    <section style={bannerStyle}>
      <h2 style={titleStyle}>All News</h2>
      <div style={breadcrumbStyle}>
        <Link href="/" style={linkStyle}>
          Home
        </Link>{" "}
        / <strong>News</strong>
      </div>
    </section>
  );
}

export default function NewsList() {
  const [news, setNews] = useState([]);

  // ✅ Fetch all news from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <>
      <Head>
        <title>News - APMC</title>
      </Head>

      {/* Header */}
      <Header />

      {/* Banner Section */}
      <NewsBanner />

      {/* News Cards Section */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "50px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          Latest Updates & Announcements
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {news.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
              No news available.
            </p>
          ) : (
            news.map((n) => (
              <div
                key={n.slug}
                style={{
                  border: "1px solid #ddd",
                  padding: "20px",
                  borderRadius: "8px",
                  background: "#fff",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "10px",
                  }}
                >
                  {n.title}
                </h3>
                <p style={{ color: "#555", marginBottom: "15px" }}>
                  {n.description.length > 150
                    ? n.description.slice(0, 150) + "..."
                    : n.description}
                </p>
                <Link
                  href={`/news/${n.slug}`}
                  style={{
                    color: "#5db04a",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Read More →
                </Link>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
