import governmentMembers from '../data/governmentMembers'; // Adjust path as needed

const GovernmentBody = () => {
  return (
    <div className="gov container py-5 text-center">
      <h2 className="mb-4">Government Body Members</h2>
      <div className="row justify-content-center">
        {governmentMembers.map((member, index) => (
          <div key={index} className="col-md-3 mb-3 d-flex justify-content-center">
            <div className="card shadow-sm p-3 border-0" style={{ width: '16rem', alignItems: 'center', borderRadius: '10px', backdropFilter: 'blur(17px)', backgroundColor: 'rgba(255, 255, 255, 0.5)', }}>
              <img
                src={member.image}
                alt={member.name}
                className="card-img-top"
                style={{ height: 'auto', width: 'auto', objectFit: 'cover' }}
              />
              <div className="card-body text-start">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text small">{member.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentBody;
