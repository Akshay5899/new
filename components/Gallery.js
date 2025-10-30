const Gallery = () => {
  const images = [
    '/G-1.png',
    '/G-2.png',
    '/G-3.png',
    '/G-1.png',
    '/G-2.png',
    '/G-3.png',
  ]; // Replace with your actual image paths

  return (
    <section style={{ width: '100%', padding: '2rem 0', overflowX: 'hidden' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', }}>Gallery</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Ensures grid adjusts based on screen size
          gap: '1rem', // Spacing between images
          width: '100%',
          boxSizing: 'border-box',
          padding: '0 1rem', // Adding padding for mobile-friendly appearance
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              overflow: 'hidden',
              borderRadius: '12px', // A little more rounded edges
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for better visibility
            }}
          >
            <img
              src={src}
              alt={`Gallery image ${i + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover', // Ensures images cover the area without stretching
                borderRadius: '12px', // Matching rounded corners with the card
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
