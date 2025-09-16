import ClientLayout from "../components/ClientLayout";
import "./globals.css";

export const metadata = {
  title: "Herbal Store - Natural Wellness Products",
  description:
    "Discover premium herbal products and natural remedies for your wellness journey",
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
