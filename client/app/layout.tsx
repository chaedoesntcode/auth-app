import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/providers/UserProvider";
import { Toaster } from "react-hot-toast";
import Header from "./components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "buildIT",
  description: "Bridging the gap between candidates and employers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={inter.className}>
        <Header />
        <Toaster position="top-center" />
        <UserProvider>
        {children}
        </UserProvider>
      </body>
    </html>
  );
}
