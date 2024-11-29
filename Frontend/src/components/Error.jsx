import { useLocation } from 'react-router-dom';

const Error = () => {
  const location = useLocation();
  const message = location.state?.message || "An unexpected error occurred";

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Error</h1>
      <p>{message}</p>
    </div>
  );
};

export default Error;
