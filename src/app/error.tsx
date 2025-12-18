"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
