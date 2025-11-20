export default function HeroImage() {
  return (
    <div>
      {/* Hero Image Section */}
      <div
        className="banner align-items-center"
      >
        {/* Optional Content Over the Image, If Needed */}
      </div>

      {/* Scrolling Text Section with Title on the Same Line */}
      <div style={{ backgroundColor: '#00A24F' }} className="text-white p-3">
        <div className="container d-flex align-items-center">
          <h4 className="mb-0 me-3 text-white">Latest Update:</h4> {/* Title */}
          <div className="scrolling-text-container" style={{ flexGrow: 1 }}>
            <div className="scrolling-text">
              Agricultural Produce Market Committee | Agricultural Produce Market Committee | Agricultural Produce Market Committee | Agricultural Produce Market Committee
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
