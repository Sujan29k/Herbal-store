"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterBottom from "@/components/FooterBottom";

export default function ClientLayout({
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

  // Check if current path is an admin route or in noLayoutRoutes
  const isAdminRoute = pathname?.startsWith("/admin");
  const hideLayout = noLayoutRoutes.includes(pathname ?? "");

  return (
    <SessionProvider
      basePath="/api/auth"
      refetchInterval={5 * 60} // Refetch session every 5 minutes
      refetchOnWindowFocus={true}
    >
      <div className="layout">
        {!hideLayout && !isAdminRoute && <Navbar />}
        <main className="main-content">{children}</main>
        {!hideLayout && !isAdminRoute && <Footer />}
        {isAdminRoute && <FooterBottom />}
      </div>
    </SessionProvider>
  );
}
