import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Appbar } from "@repo/ui/Appbar";
import { CookiesProvider } from "react-cookie";

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
  return (
    <html lang="en">
      <body className={inter.className}>
          <div>
            <Appbar/>
            <div className="w-auto h-fit">
              {/* <CookiesProvider> */}
                {children}
              {/* </CookiesProvider> */}
            </div>
          </div>
        </body>
    </html>
  );
}
