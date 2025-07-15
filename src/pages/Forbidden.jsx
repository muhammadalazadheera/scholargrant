import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-4">
      <h1 className="text-7xl font-bold text-warning">403</h1>
      <p className="text-xl mt-4">Access Denied. You don’t have permission to view this page.</p>
      <span className="text-4xl mt-2">🔒</span>
      <Link to="/" className="btn btn-secondary mt-6">
        ⬅ Back to Homepage
      </Link>
    </div>
  );
};

export default Forbidden;
