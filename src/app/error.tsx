'use client';
import { useEffect, useState } from 'react';
import "@clayui/css/lib/css/atlas.css";
import Image from "next/image";

export default function SomethingWentWrong() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Only render on the client side
        console.log(window.location);
    }, []);

    if (!isClient) return null; // Prevent rendering on the server

    return (
        <>
            <div className="bg-white flex flex-col min-h-screen items-center justify-center sm:py-12 md:py-16 lg:py-20 text-wrap shadow-lg relative">
                <div className="w-full max-w-md flex flex-col items-center gap-6">
                    <Image
                        src="/images/success_state.svg"
                        alt="Success State"
                        width={350}
                        height={350}
                    />
                    <p className="text-black text-2xl font-semibold text-center">
                        Something Went Wrong
                    </p>
                    <p className="text-gray-400 text-lg text-center">
                        Something went wrong. Please try again later.
                    </p>
                </div>
            </div>
        </>
    );
}
