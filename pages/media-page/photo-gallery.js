import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PhotoGallery() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_BASE}/api/albums`)
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch((err) => console.error("Error fetching albums:", err));
  }, []);

  const openAlbum = (album) => {
    fetch(`${API_BASE}/api/albums/${album.id}`)
      .then((res) => res.json())
      .then((data) => setSelectedAlbum(data))
      .catch((err) => console.error("Error fetching album details:", err));
  };

  const closeAlbum = () => setSelectedAlbum(null);

  const getImageUrl = (url) => {
    if (!url) return "/placeholder.png";
    // Ensure no duplicate slash
    return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  return (
    <>
      <Header />

      {/* Breadcrumb Section */}
      <section
        style={{
          background: "#f5f5f5",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "10px" }}>
          Photo Gallery
        </h1>
        <p>
          <a href="/" style={{ color: "green", textDecoration: "none" }}>Home</a> /{" "}
          <strong>Photo Gallery</strong>
        </p>
      </section>

      {/* Album Section */}
      <div style={{ padding: "40px 5%", minHeight: "400px" }}>
        {!selectedAlbum ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {albums.length > 0 ? (
              albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => openAlbum(album)}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    background: "#fff",
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  <img
                    src={getImageUrl(album.cover)}
                    alt={album.title}
                    style={{ width: "100%", height: "220px", objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />
                  <div style={{ padding: "15px", textAlign: "center" }}>
                    <h3 style={{ marginBottom: "8px" }}>{album.title}</h3>
                    <p style={{ color: "#666" }}>
                      {album.photoCount || 0} Photos
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No albums found.</p>
            )}
          </div>
        ) : (
          <div>
            <button
              onClick={closeAlbum}
              style={{
                background: "green",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              ← Back to Albums
            </button>

            <h2 style={{ marginBottom: "20px" }}>{selectedAlbum.title}</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "15px",
              }}
            >
              {selectedAlbum.photos && selectedAlbum.photos.length > 0 ? (
                selectedAlbum.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(photo.url)}
                    alt={photo.alt || "Gallery"}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />
                ))
              ) : (
                <p>No photos found in this album.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
