import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Location Chat App",
  description: "Chat with people near your location",
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
