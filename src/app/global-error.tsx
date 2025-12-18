"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0fdf4",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                color: "#ef4444",
                marginBottom: "1rem",
              }}
            >
              500
            </h1>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Server Error
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "2rem" }}>
              Something went wrong on our end.
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.75rem",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
