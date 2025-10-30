import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function AddNewsBreadcrumb() {
  const bannerStyle = { background: "#f5f5f5", textAlign: "center", padding: "80px 20px" };
  const titleStyle = { fontSize: "42px", fontWeight: "700", color: "#000", marginBottom: "10px" };
  const breadcrumbStyle = { fontSize: "18px" };
  const linkStyle = { color: "#34a853", textDecoration: "none" };

  return (
    <section style={bannerStyle}>
      <h2 style={titleStyle}>Add News</h2>
      <div style={breadcrumbStyle}>
        <Link href="/" style={linkStyle}>Home</Link> / <Link href="/news" style={linkStyle}>News</Link> / <strong>Add News</strong>
      </div>
    </section>
  );
}

export default function AddNews() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchNews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/news");
      const data = await res.json();
      setNewsList(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchNews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newsData = { title, description };

    try {
      const url = editingId
        ? `http://localhost:5000/api/news/${editingId}`
        : "http://localhost:5000/api/news";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      });

      if (res.ok) {
        setMessage(editingId ? "News updated successfully!" : "News added successfully!");
        setTitle(""); setDescription(""); setEditingId(null);
        fetchNews();
      } else { setMessage("Failed to submit news."); }
    } catch (error) {
      console.error(error); setMessage("Error submitting news.");
    }
  };

  const handleEdit = (news) => { setTitle(news.title); setDescription(news.description); setEditingId(news.id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/news/${id}`, { method: "DELETE" });
      if (res.ok) { setMessage("News deleted successfully!"); fetchNews(); } 
      else setMessage("Failed to delete news.");
    } catch (error) { console.error(error); setMessage("Error deleting news."); }
  };

  return (
    <>
      <Head><title>Add News - APMC</title></Head>
      <Header />
      <AddNewsBreadcrumb />
      <main style={{ maxWidth: "800px", margin: "50px auto", padding: "0 20px" }}>
        {message && <p style={{ textAlign: "center", color: "#34a853" }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: "100%", padding: "10px", marginTop: "5px" }}/>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={5} style={{ width: "100%", padding: "10px", marginTop: "5px" }}/>
          </div>
          <button type="submit" style={{ background: "#34a853", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            {editingId ? "Update News" : "Add News"}
          </button>
          {editingId && <button type="button" onClick={() => { setTitle(""); setDescription(""); setEditingId(null); }} style={{ marginLeft: "10px", padding: "10px 20px", border: "1px solid #777", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>}
        </form>

        <section style={{ marginTop: "50px" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "600" }}>Existing News</h2>
          {newsList.length === 0 ? <p style={{ color: "#777" }}>No news available.</p> :
          <ul style={{ listStyle: "none", padding: 0 }}>
            {newsList.map((n) => (
              <li key={n.id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "10px", borderRadius: "5px", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>{n.title}</h3>
                  <p style={{ margin: "5px 0", color: "#555" }}>{n.description.length > 150 ? n.description.slice(0, 150)+"..." : n.description}</p>
                  <Link href={`/news/${n.slug}`} style={{ color: "#34a853", fontWeight: "bold" }}>View →</Link>
                </div>
                <div>
                  <button onClick={() => handleEdit(n)} style={{ marginRight: "10px", background: "#f0ad4e", border: "none", padding: "8px 12px", color: "#fff", borderRadius: "5px", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => handleDelete(n.id)} style={{ background: "#d9534f", border: "none", padding: "8px 12px", color: "#fff", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                </div>
              </li>
            ))}
          </ul>}
        </section>
      </main>
      <Footer />
    </>
  );
}
