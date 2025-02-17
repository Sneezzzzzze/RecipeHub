'use client';
import Image from "next/image";
export default function NotFound() {
    return (
        <>
            <div className="bg-white flex flex-col min-h-screen items-center justify-center sm:py-12 md:py-16 lg:py-20 text-wrap shadow-lg relative">
                <div className="w-full max-w-md flex flex-col items-center gap-6">
                    <Image
                        src="/success_state.svg"
                        alt="Success State"
                        width={350}
                        height={350}
                    />
                    <p className="text-black text-2xl font-semibold text-center">
                        404 Not Found
                    </p>
                    <p className="text-gray-400 text-lg text-center">
                        The page you are looking for is not found.
                    </p>
                </div>
            </div>
        </>
    );
}

