import "@/app/ui/globals.css";
import "@clayui/css"
import {ibmPlexSansThai} from "@/app/ui/fonts";
import {Metadata} from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata: Metadata = {
    title: {
        template: '%s | RecipeHub',
        default: 'RecipeHub',
    },
    description: 'The official Next.js Learn Dashboard built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${ibmPlexSansThai.variable} font-regular`}>
        {children} {/* This renders your page content */}
        <Analytics />
        <SpeedInsights/>
      </body>
      </html>
  );
}
