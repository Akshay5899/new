import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function SinglePost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        const data = await res.json();
        const found = data.find((p) => p.slug === slug);
        setPost(found);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading post...</p>;

  return (
    <>
      <Head>
        <title>{post.title} - APMC</title>
      </Head>

      <Header />

      <main style={{ maxWidth: "800px", margin: "50px auto", padding: "0 15px" }}>
        <h1 style={{ marginBottom: "10px" }}>{post.title}</h1>
        <p style={{ color: "#888", marginBottom: "20px" }}>
          {new Date(post.createdAt).toLocaleString()}
        </p>

        {post.image && (
          <img
            src={`http://localhost:5000${post.image}`}
            alt={post.title}
            style={{ width: "100%", borderRadius: "5px", marginBottom: "20px" }}
          />
        )}

        <p style={{ fontSize: "18px", lineHeight: "1.8" }}>{post.description}</p>
      </main>

      <Footer />
    </>
  );
}
