import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// ✅ Breadcrumb + Banner Section
function SingleNewsBreadcrumb({ title }) {
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
      <h2 style={titleStyle}>{title}</h2>
      <div style={breadcrumbStyle}>
        <Link href="/" style={linkStyle}>
          Home
        </Link>{" "}
        /{" "}
        <Link href="/news" style={linkStyle}>
          News
        </Link>{" "}
        / <strong>{title}</strong>
      </div>
    </section>
  );
}

export default function SingleNews() {
  const router = useRouter();
  const { slug } = router.query;
  const [news, setNews] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`http://localhost:5000/api/news`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((n) => n.slug === slug);
        setNews(found || null);
      });
  }, [slug]);

  if (!news)
    return (
      <>
        <Header />
        <main style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading or news not found...</p>
        </main>
        <Footer />
      </>
    );

  return (
    <>
      <Head>
        <title>{news.title} - APMC</title>
      </Head>

      <Header />

      {/* ✅ Banner + Breadcrumb */}
      <SingleNewsBreadcrumb title={news.title} />

      <main style={{ maxWidth: "800px", margin: "50px auto", padding: "0 20px" }}>
        <h2>{news.title}</h2>
        <p style={{ fontSize: "14px", color: "gray" }}>
          {new Date(news.createdAt).toLocaleString()}
        </p>
        <p style={{ marginTop: "30px", lineHeight: "1.8", fontSize: "16px", textAlign: "justify" }}>
          {news.description}
        </p>
      </main>

      <Footer />
    </>
  );
}
