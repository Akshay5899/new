import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ImportantLinks = () => {
  const links = [
    { src: '/links-img/1.png', alt: 'Maharashtra Government', url: 'https://www.maharashtra.gov.in' },
    { src: '/links-img/2.png', alt: 'Agriculture Department', url: 'https://www.msamb.com/' },
    { src: '/links-img/3.png', alt: 'Digital India', url: 'https://www.digitalindia.gov.in' },
    { src: '/links-img/4.png', alt: 'Krishi', url: 'https://krishi.maharashtra.gov.in/' },
    { src: '/links-img/5.png', alt: 'Apeda', url: 'https://apeda.gov.in/' },
    { src: '/links-img/6.png', alt: 'Agmarknet', url: 'https://agmarknet.gov.in/' },
    { src: '/links-img/7.png', alt: 'Nabard', url: 'https://www.nabard.org/Hindi/Default.aspx' },
    { src: '/links-img/8.png', alt: 'NHB', url: 'https://www.nhb.gov.in/' },
    { src: '/links-img/9.png', alt: 'MOFPI', url: 'https://mofpi.gov.in/' },
    { src: '/links-img/10.png', alt: 'Government Of India', url: 'https://www.india.gov.in/' },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 5,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 992, min: 767 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  return (
    <section style={{ padding: '2rem 0', textAlign: 'center', backgroundColor: '#F9F9F9', }}>
      <h2 style={{ marginBottom: '1.5rem', }}>
        Important Links
      </h2>

      <div className="container">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          arrows={true}
          keyBoardControl={true}
          showDots={false}
          containerClass="carousel-container"
          itemClass="px-2"
        >
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <img src={link.src} alt={link.alt} style={imageStyle} />
            </a>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

const linkStyle = {
  width: '100%',
  height: 'auto',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
};

export default ImportantLinks;
