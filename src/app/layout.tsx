import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@clayui/css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>  {/* Apply font variables */}
      {children} {/* This renders your page content */}
      </body>
      </html>
  );
}
