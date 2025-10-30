
const TodayRate = () => {
  return (
    <section className="daily-rates py-5 text-center" style={{ backgroundColor: '#F9F9F9' }}>
      <div className="container">
        <h2>Today's Market Rate</h2>

        {/* Embed the iframe to display the daily market rate */}
        <iframe 
          src="https://apmcmumbai.org/bajarbhav/veg-daily-public" 
          title="veg-daily-public" 
          style={{
    overflowY: 'hidden',
    width: '100%',
    height: '250px',
    border: 'none',
  }}
          scrolling="no">
        </iframe>
      </div>
    </section>
  );
};

export default TodayRate;
