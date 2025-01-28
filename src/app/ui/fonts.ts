import { Geist, Geist_Mono, IBM_Plex_Sans_Thai } from "next/font/google";

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const ibmPlexSansThai = IBM_Plex_Sans_Thai({
    weight: "100",
    style: "normal",
    variable: "--font-ibm-plex-sans-thai",
    subsets: ["thai"],
});