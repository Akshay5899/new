import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const initialVideos = [
  { id: 1, url: "https://www.youtube.com/embed/wpx2NAwXezQ" },
  { id: 2, url: "https://www.youtube.com/embed/wpx2NAwXezQ" },
  { id: 3, url: "https://www.youtube.com/embed/wpx2NAwXezQ" },
];

const moreVideos = [
  { id: 4, url: "https://www.youtube.com/embed/wpx2NAwXezQ" },
  { id: 5, url: "https://www.youtube.com/embed/wpx2NAwXezQ" },
];

export default function VideoGallery() {
  const [videos, setVideos] = useState(initialVideos);
  const [loadedAll, setLoadedAll] = useState(false);

  const loadMore = () => {
    setVideos([...videos, ...moreVideos]);
    setLoadedAll(true);
  };

  return (
    <>
      <Header />

      {/* Breadcrumb / Banner Section */}
      <section
        style={{
          background: "#f5f5f5",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "10px" }}>
          Video Gallery
        </h1>
        <p>
          <Link href="/" style={{ color: "green", textDecoration: "none" }}>
            Home
          </Link>{" "}
          /{" "}
          <Link href="/media-page/video-gallery" style={{ color: "green", textDecoration: "none" }}>
            Media
          </Link>{" "}
          / <strong>Video Gallery</strong>
        </p>
      </section>

      {/* Videos Grid */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="aspect-video rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              <iframe
                width="100%"
                height="100%"
                src={video.url}
                title={`video-${video.id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>

        {!loadedAll && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              style={{
                backgroundColor: "#00A24F",
                color: "white",
                padding: "12px 24px",
                marginTop: "40px",
                borderRadius: "8px",
                fontSize: "18px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#008e42")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#00A24F")}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
