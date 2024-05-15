import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Shoppers",
  description: "It is a full-fledged E-commerce Platform with Admin and Merchent panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <script src="https://kit.fontawesome.com/5c901d5cc7.js" crossOrigin="anonymous"></script>
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
