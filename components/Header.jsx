import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  // Dropdown hover state
  const [hoverIndex, setHoverIndex] = useState(null);

  const menuItems = [
    { name: 'Home', link: '/' },
    { 
      name: 'About Us', 
      link: '/about-us', 
      dropdown: [
         { name: 'About APMC', link: '/about-us/about-apmc' },
         { name: 'Board of Directors', link: '/about-us/board-of-directors' },
         { name: 'Departments', link: '/about-us/departments' },
         { name: 'Organizational Management', link: '/about-us/organizational-management' },
         { name: 'Annual Reports', link: '/about-us/annual-reports' },
         { name: 'Annual Income', link: '/about-us/annual-income' },

        // { name: 'About APMC', link: '#' },
        // { name: 'Board of Directors', link: '#' },
        // { name: 'Departments', link: '/departments' },
        // { name: 'Organizational Management', link: '#' },
        // { name: 'Annual Reports', link: '#' },
        // { name: 'Annual Income', link: '#' },
      ]
    },
    { 
      name: 'Market', 
      link: '/market', 
      dropdown: [
        { name: 'Nevasa Main Office Division', link: '/market/nevasa-main-office-department' },
        { name: 'Sub-Market Division', link: '/market/sub-department' },
      ]
    },
    { 
      name: 'Market Price', 
      link: '#', 
      dropdown: [
        { name: 'Daily Market Price', link: '#' },
      ]
    },
    { name: 'Initiatives', link: '#' },
    { name: 'Services', link: '#' },
    { 
      name: 'Media', 
      link: '#',
      dropdown: [
        { name: 'Photo Gallery', link: '#' },
        { name: 'Video Gallery', link: '#' },
      ]
    },
    { 
      name: 'News', 
      link: '#',
      dropdown: [
        { name: 'Paper/Print Media', link: '#' },
        { name: 'Electronics/Online Media', link: '#' },
        { name: 'Press Note', link: '#' },
      ]
    },
    { name: 'Tender', link: '#' },
    { name: 'RTI', link: '#' },
    { 
      name: 'Contact', 
      link: '#',
      dropdown: [
        { name: 'Feedback', link: '#' },
        { name: 'Complaint', link: '#' },
        { name: 'Contact', link: '#' },
        { name: 'Contact Details', link: '#' },
        { name: 'Important Links', link: '#' },
      ]
    },
  ];

  const quickLinks = [
    { name: "Farmer's Registration", link: 'https://farmer.mahaapmc.in/' },
    { name: "Farmer's Scheme", link: '#' },
    { name: 'Auction Timetable', link: '#' },
    { name: 'Circulars', link: '#' },
    { name: 'GR', link: '#' },
    { name: 'Bajarbhav', link: '#' },
  ];

  return (
    <>
      {/* Top green bar */}
      <div className="text-white py-2 small" style={{ backgroundColor: '#00A24F' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link href="https://www.maharashtra.gov.in/" className="text-white text-decoration-none me-2">Government of Maharashtra</Link>
            <span className="text-white">|</span>
            <Link href="https://mahapanan.maharashtra.gov.in/Site/Home/Index.aspx" className="text-white text-decoration-none mx-2">Directorate of Marketing</Link>
            <span className="text-white">|</span>
            <Link href="https://www.msamb.com/" className="text-white text-decoration-none ms-2">Board of Marketing</Link>
          </div>
          <div>
            <Link href="#" className="text-white">English &#x25BE;</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container">
<nav className="navbar navbar-expand-lg navbar-light py-2">
  <div className="container-fluid">
    <div className="row align-items-center w-100">
      {/* Left column - Logo */}
      <div className="col-12 col-lg-2 d-flex justify-content-between align-items-center">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/logo-agriculture.png"
            alt="Logo"
            height="auto"
            className="me-2"
          />
        </Link>

        {/* Toggle button (visible only on mobile/tablet) */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Right column - Title + Menu */}
      <div className="col-12 col-lg-10">
        {/* Title visible only on large screens */}
        <h3 className="fw-bold text-center text-lg-start mb-2 mb-lg-3 d-none d-lg-block">
          Agricultural Produce Market Committee
        </h3>

        {/* Collapsible section for mobile/tablet */}
        <div className="collapse navbar-collapse" id="mainNavbar">

          <ul className="navbar-nav mt-2 mt-lg-0 align-items-start justify-content-start">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`nav-item ${item.dropdown ? 'dropdown' : ''}`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <Link
                  href={item.link}
                  className={`nav-link ${item.dropdown ? 'dropdown-toggle' : ''}`}
                  {...(item.dropdown ? { 'data-bs-toggle': 'dropdown' } : {})}
                >
                  {item.name}
                </Link>

                {item.dropdown && (
                  <ul
                    className={`dropdown-menu ${
                      hoverIndex === index ? 'show' : ''
                    }`}
                  >
                    {item.dropdown.map((sub, i) => (
                      <li key={i}>
                        <Link href={sub.link} className="dropdown-item">
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</nav>



            {/* Orange quick links bar */}
      <div className="text-end">
        <div className="py-2 ps-3 d-inline-block text-end" style={{ backgroundColor: '#FF9500D4' }}>
          {quickLinks.map((link, idx) => (
            <Link key={idx} href={link.link} className="text-white text-decoration-none me-3 mb-1 mb-md-0">{link.name}</Link>
          ))}
        </div>
      </div>
      </div>


    </>
  );
}
