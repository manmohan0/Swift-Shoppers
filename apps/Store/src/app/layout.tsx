import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Appbar } from "@repo/ui/Appbar";
import { AuthProvider } from "@repo/ui/AuthProvider"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Shoppers",
  description: "It is a full-fledged E-commerce Platform with Admin and Merchent panel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
            {/* <SessionProvider> */}
      <body className={inter.className}>
          <div>
            <AuthProvider>
              <Appbar/>
              <div className="w-auto h-fit">
                {children}
              </div>
            </AuthProvider>
          </div>
        </body>
            {/* </SessionProvider> */}
    </html>
  );
}
