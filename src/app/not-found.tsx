'use client';
// import { useEffect, useState } from 'react';
import Image from "next/image";
export default function NotFound() {
    // const [isClient, setIsClient] = useState(false);
    //
    // useEffect(() => {
    //     setIsClient(true); // Only run after the component is mounted in the browser
    //     console.log(window.location);
    // }, []);
    //
    // if (!isClient) return null; // Prevent SSR issues

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
                    <p className="text-black text-2xl text-center">
                        404 Not Found
                    </p>
                </div>
            </div>
        </>
    );
}

