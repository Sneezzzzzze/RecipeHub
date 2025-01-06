import "./ui/globals.css";
import "@clayui/css"
import {geistMono, geistSans} from "@/app/ui/fonts";

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
