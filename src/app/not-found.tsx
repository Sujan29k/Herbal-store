import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-green-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          <span>🏠</span>
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
