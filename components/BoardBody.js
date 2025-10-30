// components/BoardBody.js
import { useRouter } from 'next/router';
import boardDirectors from '../data/boardDirectors'; // ✅ Correct import

const BoardBody = ({ showAll = false }) => {
  const router = useRouter();

  // ✅ Use the correct variable name
  const membersToShow = showAll ? boardDirectors : boardDirectors.slice(0, 3);

  return (
    <div className="board container py-5 text-center">
      <h2 className="mb-4">Board of Directors</h2>
      <div className="row justify-content-center">
        {membersToShow.map((member, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center"
          >
            <div
              className="card shadow-sm p-3 border-0"
              style={{
                width: '100%',
                maxWidth: '25rem',
                alignItems: 'center',
                borderRadius: '10px',
                backgroundColor: '#F9F9F9',
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="card-img-top"
                style={{ height: 'auto', width: 'auto', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text small">{member.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <button
          className="btn btn-warning mt-3"
          onClick={() => router.push('/about-us/board-of-directors')}
        >
          All Boards of Directors &gt;
        </button>
      )}
    </div>
  );
};

export default BoardBody;
