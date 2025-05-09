import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 bg-primary text-black font-semibold rounded-full hover:bg-primary-dark transition  border-2 border-primary hover:border-primary-dark"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
