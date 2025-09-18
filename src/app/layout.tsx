import ClientLayout from "../components/ClientLayout";
import "./globals.css";

export const metadata = {
  title: "Herbal Store - Natural Wellness Products",
  description:
    "Discover premium herbal products and natural remedies for your wellness journey",
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1",
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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-black">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
