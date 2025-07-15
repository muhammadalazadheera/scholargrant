import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-4">
      <h1 className="text-7xl font-bold text-error">404</h1>
      <p className="text-xl mt-4">Oops! Page not found.</p>
      <span className="text-4xl mt-2">😵‍💫</span>
      <Link to="/" className="btn btn-primary mt-6">
        ⬅ Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
