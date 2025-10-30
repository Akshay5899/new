import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function AddPaperPrintMedia() {
  const [mediaList, setMediaList] = useState([]);
  const [image, setImage] = useState(null);
  const [editingSlug, setEditingSlug] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all media
  const fetchMedia = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/paper-print-media");
      const data = await res.json();
      setMediaList(data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching media");
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Handle add or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image && !editingSlug) return setMessage("Please select an image");

    const formData = new FormData();
    if (image) formData.append("image", image);

    try {
      let url = "http://localhost:5000/api/paper-print-media";
      let method = "POST";

      if (editingSlug) {
        url += `/${editingSlug}`;
        method = "PUT";
      }

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (res.ok) {
        setMessage(editingSlug ? "Media updated!" : "Media added!");
        setImage(null);
        setEditingSlug("");
        fetchMedia();
      } else {
        setMessage(data.message || "Error saving media");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
  };

  const handleEdit = (media) => {
    setEditingSlug(media.slug);
    setMessage("Select a new image and submit to update.");
  };

  const handleDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this media?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/paper-print-media/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessage("Media deleted successfully!");
        fetchMedia();
      } else {
        setMessage(data.message || "Error deleting media");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <>
      <Header />

      {/* Merged Breadcrumb Section */}
      <section style={{ background: "#f5f5f5", padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "10px" }}>
          Add / Manage Paper Media
        </h2>
        <div style={{ fontSize: "18px" }}>
          <Link href="/" style={{ color: "#34a853", textDecoration: "none" }}>Home</Link> /{" "}
          <strong>Add / Manage Paper Media</strong>
        </div>
      </section>

      {/* Form */}
      <div style={{ maxWidth: "400px", margin: "30px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", textAlign: "center" }}>
        <h2>{editingSlug ? "Edit Media" : "Add Paper Media"}</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required={!editingSlug}
          />
          <div style={{ marginTop: "10px" }}>
            <button type="submit" style={{ padding: "10px 20px" }}>
              {editingSlug ? "Update Media" : "Add Media"}
            </button>
            {editingSlug && (
              <button
                type="button"
                onClick={() => { setEditingSlug(""); setMessage(""); setImage(null); }}
                style={{ marginLeft: "10px", padding: "10px 20px" }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Media List Table */}
      <div style={{ maxWidth: "800px", margin: "30px auto" }}>
        <h3>All Paper Media</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Image</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Created At</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mediaList.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "10px" }}>No media found.</td>
              </tr>
            )}
            {mediaList.map((m) => (
              <tr key={m.slug}>
                <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                  {m.image && <img src={`http://localhost:5000${m.image}`} alt="" style={{ maxWidth: "100px", maxHeight: "100px" }} />}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(m.createdAt).toLocaleString()}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                  <button onClick={() => handleEdit(m)} style={{ marginRight: "10px" }}>Edit</button>
                  <button onClick={() => handleDelete(m.slug)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
}
