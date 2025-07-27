"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/login", "/signup"]; // routes without Navbar/Footer
  const hideLayout = noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="bg-white text-black">
        <SessionProvider>
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
