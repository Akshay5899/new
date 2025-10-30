import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PostArchive() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    // Optional: Poll every 5 seconds for auto-update
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>All Posts - APMC</title>
      </Head>

      <Header />

      <main style={{ maxWidth: "1200px", margin: "50px auto", padding: "0 15px" }}>
        <h2 style={{ marginBottom: "30px", textAlign: "center" }}>All Posts</h2>

        {posts.length === 0 && <p style={{ textAlign: "center" }}>No posts found.</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {posts.map((post) => (
            <div
              key={post.slug}
              style={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              className="post-card"
            >
              {/* Featured Image */}
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              )}

              {/* Title */}
              <h3 style={{ margin: "15px 15px 5px 15px", fontSize: "1.2rem" }}>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h3>

              {/* Description */}
              <p style={{ margin: "0 15px 10px 15px", flexGrow: 1 }}>
                {post.description.substring(0, 150)}...
              </p>

              {/* Read More */}
              <div style={{ margin: "0 15px 15px 15px" }}>
                <Link href={`/posts/${post.slug}`} style={{ color: "#5db04a", fontWeight: "500" }}>
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* Hover & responsive styles */}
      <style jsx>{`
        .post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .post-card img {
            height: 180px;
          }
        }

        @media (max-width: 480px) {
          .post-card img {
            height: 150px;
          }
        }
      `}</style>
    </>
  );
}
