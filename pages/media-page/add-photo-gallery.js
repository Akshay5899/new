import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function AddPhotoGallery() {
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/albums`);
      setAlbums(res.data);
    } catch (err) {
      console.error("Error fetching albums:", err);
    }
  };

  const handleFileChange = (e) => setPhotos(e.target.files);

  const resetForm = () => {
    setTitle("");
    setPhotos([]);
    setEditingAlbum(null);
    setExistingPhotos([]);
    setMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage("Please enter album title.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }

    try {
      setLoading(true);
      if (editingAlbum) {
        await axios.put(`${API_BASE}/api/albums/${editingAlbum.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Album updated successfully!");
      } else {
        await axios.post(`${API_BASE}/api/albums`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Album created successfully!");
      }
      resetForm();
      fetchAlbums();
    } catch (err) {
      console.error("Error saving album:", err);
      setMessage("Error saving album. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (album) => {
    setEditingAlbum(album);
    setTitle(album.title);
    setExistingPhotos(album.photos || []);
    setPhotos([]);
    setMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteAlbum = async (albumId) => {
    if (!confirm("Are you sure you want to delete this album?")) return;
    try {
      await axios.delete(`${API_BASE}/api/albums/${albumId}`);
      setMessage("Album deleted successfully!");
      fetchAlbums();
    } catch (err) {
      console.error("Error deleting album:", err);
      setMessage("Error deleting album.");
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!editingAlbum) return;
    try {
      await axios.delete(`${API_BASE}/api/albums/${editingAlbum.id}/photos/${photoId}`);
      setExistingPhotos((prev) => prev.filter((p) => p.id !== photoId));
      setMessage("Photo deleted successfully!");
    } catch (err) {
      console.error("Error deleting photo:", err);
      setMessage("Error deleting photo.");
    }
  };

  const getImageUrl = (url) => {
    if (!url) return "/placeholder.png";
    return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  return (
    <>
      <Header />
      <main style={{ maxWidth: "900px", margin: "50px auto", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {editingAlbum ? "Edit Photo Gallery" : "Add Photo Gallery"}
        </h2>

        <Link
          href="/media-page/photo-gallery"
          style={{ display: "inline-block", marginBottom: "20px", color: "#007bff" }}
        >
          ← Back to Gallery
        </Link>

        {message && (
          <p style={{ color: message.includes("successfully") ? "green" : "red", fontWeight: "bold" }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Album Title</label>
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Upload New Photos</label>
            <br />
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {editingAlbum && existingPhotos.length > 0 && (
            <div style={{ marginBottom: "15px" }}>
              <label>Existing Photos</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "5px" }}>
                {existingPhotos.map((photo) => (
                  <div key={photo.id} style={{ position: "relative" }}>
                    <img
                      src={getImageUrl(photo.url)}
                      alt={photo.alt || "Photo"}
                      style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(photo.id)}
                      style={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        fontSize: "12px",
                        lineHeight: "18px",
                        textAlign: "center",
                      }}
                      title="Delete photo"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: editingAlbum ? "#f39c12" : "#34a853",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {editingAlbum ? "Update Album" : "Add Album"}
          </button>

          {editingAlbum && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: "10px 20px",
                background: "#ccc",
                color: "#000",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>
          )}
        </form>

        <h3 style={{ marginTop: "40px" }}>Existing Albums</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {albums.length > 0 ? (
            albums.map((album) => (
              <div
                key={album.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={getImageUrl(album.cover || (album.photos && album.photos[0]?.url))}
                  alt={album.title}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
                <div style={{ padding: "10px" }}>
                  <h4 style={{ marginBottom: "10px" }}>{album.title}</h4>
                  <button
                    onClick={() => handleEdit(album)}
                    style={{
                      background: "#f39c12",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAlbum(album.id)}
                    style={{
                      background: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No albums found.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
