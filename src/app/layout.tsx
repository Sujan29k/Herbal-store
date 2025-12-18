import type { Metadata } from "next";
import ClientLayout from "../components/ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Herbal Store - Natural Wellness Products",
  description:
    "Discover premium herbal products and natural remedies for your wellness journey",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
