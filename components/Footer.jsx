export default function Footer() {
return (
  <footer id="contact" className="text-white">
    <div style={{ backgroundColor: '#00A24F' }} className="py-5">
    <div className="container">
      <div className="row">
        {/* Left Column: Agricultural Produce Market Committee Info */}
<div className="row col-md-6 align-items-start">
{/* Left Column: Logo */}
<div className="foot-logo col-md-4 text-center text-md-start">
  <img
    src="/logo-white-agriculture.png"
    alt="APMC Logo"
    style={{ width: '100%', maxWidth: '150px', height: 'auto' }}
  />
</div>

{/* Right Column: Details */}
<div className="col-md-8 text-white">
  <h4>Agricultural Produce Market Committee</h4>
  <p className="text-white">🏢 At Post. Nevasa, T. Nevasa, Dist. Ahilyanagar Pincode – 414603.</p>
  <p>
    📞 
    <a href="tel:+919503956424" className="text-decoration-none text-white">
      +91-9503956424
    </a>
  </p>
  <p>
    📧 
    <a href="mailto:support@skselfdrivecar.com" className="text-decoration-none text-white">
      support@skselfdrivecar.com
    </a>
  </p>
</div>
<hr className="border-1 border-white opacity-100" />
</div>


        {/* Right Column: Map Section */}
        <div className="col-md-6 rounded-2 d-flex justify-content-center">
<iframe
  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15044.365392758546!2d74.9024188!3d19.5383217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdbfa7ef82a8ab1%3A0x0!2sNevasa%2C%20Maharashtra%20414603!5e0!3m2!1sen!2sin!4v1696729241234"
  width="100%"
  height="300"
  style={{ border: 0, borderRadius: '15px' }}
  allowFullScreen=""
  loading="lazy"
  title="Map of Nevasa, Maharashtra"
></iframe>

        </div>
      </div>

      {/* Bottom Row: Links Section */}
  <div className="footer-nav text-white">
    <div className="container">
      <div className="footer-grid">
        {/* About Us */}
        <div>
          <h5>About us</h5>
          <p><a href="#about-apmc">About APMC</a></p>
          <p><a href="#board-of-directors">Board of Directors</a></p>
          <p><a href="#departments">Departments</a></p>
          <p><a href="#org-management">Organizational Management</a></p>
          <p><a href="#annual-income">Annual Income</a></p>
          <p><a href="#annual-reports">Annual Reports</a></p>
        </div>

        {/* Market */}
        <div>
          <h5>Market</h5>
          <p><a href="#vegetable-market">Vegetable Market</a></p>
          <p><a href="#fruits-market">Fruits Market</a></p>
          <p><a href="#onion-potato-market">Onion Potato Market</a></p>
          <p><a href="#grain-market">Grain Market</a></p>
          <p><a href="#spice-market">Spice Market</a></p>
          <p><a href="#flower-market">Flower Market</a></p>
        </div>

        {/* Market Price */}
        <div>
          <h5>Market Price</h5>
          <p><a href="#daily-market">Daily Market Price</a></p>
        </div>

        {/* Initiatives */}
        <div>
          <h5>Initiatives</h5>
        </div>

        {/* Services */}
        <div>
          <h5>Services</h5>
        </div>

        {/* News */}
        <div>
          <h5>News</h5>
          <p><a href="#paper-media">Paper/Print Media</a></p>
          <p><a href="#online-media">Electronics/Online Media</a></p>
          <p><a href="#press-note">Press Note</a></p>
        </div>

        {/* Media */}
        <div>
          <h5>Media</h5>
          <p><a href="#photo-gallery">Photo Gallery</a></p>
          <p><a href="#video-gallery">Video Gallery</a></p>
        </div>

        {/* Tender */}
        <div>
          <h5>Tender</h5>
        </div>

        {/* RTI */}
        <div>
          <h5>RTI</h5>
        </div>

        {/* Contact */}
        <div>
          <h5>Contact</h5>
          <p><a href="#feedback">Feedback</a></p>
          <p><a href="#complaint">Complaint</a></p>
          <p><a href="#contact">Contact</a></p>
          <p><a href="#contact-details">Contact Details</a></p>
          <p><a href="#important-links">Important Links</a></p>
        </div>
      </div>
    </div>
  </div>


    </div>
    </div>
    <div>
      {/* Bottom Copyright */}
<div className="container bottom-foot d-flex justify-content-between align-items-center text-black py-3">
<p>
  Copyright © {new Date().getFullYear()} Agricultural Produce Market Committee. All rights reserved.
</p>
<p>
  Designed & Developed by <a style={{ color: '#FEA62B' }} href="https://brawizz.com/" className="text-decoration-none">Brawizz Tech.</a>
</p>
</div>

    </div>
  </footer>
);
}
