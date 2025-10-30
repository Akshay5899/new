import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // ------------------
  // Breadcrumb + Banner
  // ------------------
  const Banner = () => {
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
        <h2 style={titleStyle}>{editingId ? "Edit Post" : "Add Post"}</h2>
        <div style={breadcrumbStyle}>
          <Link href="/" style={linkStyle}>Home</Link> /{" "}
          <Link href="/posts" style={linkStyle}>Posts</Link> /{" "}
          <strong>{editingId ? "Edit Post" : "Add Post"}</strong>
        </div>
      </section>
    );
  };

  // ------------------
  // Fetch Posts
  // ------------------
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ------------------
  // Image Handling
  // ------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ------------------
  // Add or Update Post
  // ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const url = editingId
        ? `http://localhost:5000/api/posts/${editingId}`
        : "http://localhost:5000/api/posts";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      setMessage(editingId ? "✅ Post updated!" : "✅ Post added!");

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      setEditingId(null);

      fetchPosts();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving post");
    }
  };

  // ------------------
  // Edit Post
  // ------------------
  const handleEdit = (post) => {
    setTitle(post.title);
    setDescription(post.description);
    setPreview(post.image ? `http://localhost:5000${post.image}` : null);
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ------------------
  // Delete Post
  // ------------------
  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      await fetch(`http://localhost:5000/api/posts/${id}`, { method: "DELETE" });
      fetchPosts();
      if (editingId === id) {
        setTitle("");
        setDescription("");
        setImage(null);
        setPreview(null);
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------
  // Render
  // ------------------
  return (
    <>
      <Head>
        <title>{editingId ? "Edit Post" : "Add Post"} - APMC</title>
      </Head>

      <Header />

      <Banner />

      <main style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", margin: "10px 0", padding: "10px" }}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            required
            style={{ width: "100%", margin: "10px 0", padding: "10px" }}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="preview" style={{ width: "100%", marginTop: "10px" }} />}
          <button type="submit" style={{ marginTop: "10px", padding: "10px 20px" }}>
            {editingId ? "Update Post" : "Add Post"}
          </button>
        </form>

        {message && <p>{message}</p>}

        <hr style={{ margin: "30px 0" }} />

        <h3>All Posts</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  alt={post.title}
                />
              )}
              <div style={{ padding: "10px" }}>
                <h4>{post.title}</h4>
                <p>{post.description.substring(0, 100)}...</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleEdit(post)}
                    style={{ background: "#f0ad4e", color: "white", padding: "5px 10px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{ background: "red", color: "white", padding: "5px 10px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
