import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chat Global Indonesia",
  description: "Chat global dengan orang-orang dari lokasi yang sama di Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
