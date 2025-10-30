import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// Banner + Breadcrumb
function PaperMediaBanner() {
  const bannerStyle = {
    background: "#f5f5f5",
    textAlign: "center",
    padding: "80px 20px",
  };
  const titleStyle = { fontSize: "42px", fontWeight: "700", color: "#000", marginBottom: "10px" };
  const breadcrumbStyle = { fontSize: "18px" };
  const linkStyle = { color: "#34a853", textDecoration: "none" };

  return (
    <section style={bannerStyle}>
      <h2 style={titleStyle}>Paper / Print Media</h2>
      <div style={breadcrumbStyle}>
        <Link href="/" style={linkStyle}>Home</Link> / <strong>Paper / Print Media</strong>
      </div>
    </section>
  );
}

export default function PaperPrintMedia() {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // lightbox open
  const [currentIndex, setCurrentIndex] = useState(0); // current image index

  // Fetch media from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/paper-print-media")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };
  const closeLightbox = () => setIsOpen(false);
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  return (
    <>
      <Head>
        <title>Paper / Print Media - APMC</title>
      </Head>
      <Header />
      <PaperMediaBanner />

      <main style={{ maxWidth: "1200px", margin: "50px auto", padding: "0 20px" }}>
        {items.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>No items available.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {items.map((item, index) => (
              <div
                key={item.slug}
                style={{ borderRadius: "8px", overflow: "hidden", cursor: "pointer" }}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt="Paper/Print Media"
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              style={{
                position: "absolute",
                left: "20px",
                fontSize: "2rem",
                color: "#fff",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ◀
            </button>

            <img
              src={`http://localhost:5000${items[currentIndex].image}`}
              alt="Paper/Print Media"
              style={{ maxHeight: "80%", maxWidth: "80%", objectFit: "contain" }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              style={{
                position: "absolute",
                right: "20px",
                fontSize: "2rem",
                color: "#fff",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ▶
            </button>

            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                fontSize: "2rem",
                color: "#fff",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
