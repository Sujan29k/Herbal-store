"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noLayoutRoutes = [
    "/login",
    "/signup",
    "/thankyou",
    "/cart",
    "/checkout",
  ]; // routes without Navbar/Footer
  const hideLayout = noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="bg-white text-black">
        <SessionProvider
          basePath="/api/auth"
          refetchInterval={5 * 60} // Refetch session every 5 minutes
          refetchOnWindowFocus={true}
        >
          <div className="layout">
            {!hideLayout && <Navbar />}
            <main className="main-content">{children}</main>
            {!hideLayout && <Footer />}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
