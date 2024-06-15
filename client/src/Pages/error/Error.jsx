import { useNavigate } from 'react-router-dom';
import './error.css';

const Error = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-heading">Error</h1>
        <button className="error-button" onClick={handleNavigateHome}>
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default Error;
