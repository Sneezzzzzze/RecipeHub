'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Content from '@/app/ui/components/content';
import Footer from "@/app/ui/components/footer";

export default function Result() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();

    useEffect(() => {
        // Retrieve the data from sessionStorage
        const storedData = sessionStorage.getItem('searchData');
        if (storedData) {
            setData(JSON.parse(storedData));
        }

        // Simulate loading state delay (optional)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        import("@clayui/css/lib/css/atlas.css");
    }, []);

    const handleClick = (id: string) => {
        // Automatically navigate to the dynamic result page based on `id`
        router.push(`/result/${id}`);
    };

    return (
        <>
            <Content>
                <div className="flex flex-col items-center justify-center w-auto h-auto">
                    <div className="shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 bg-white rounded-xl w-full max-w-screen-xl">
                        <div className="flex flex-col items-center bg-white border p-4 rounded-xl shadow-md">
                            <h1 className="text-center p-1 text-xl font-bold">Search Results</h1>
                            {loading ? (
                                // Create a skeleton based on the length of `data`
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 justify-items-center text-wrap">
                                    {data?.length > 0 && [...Array(data.length)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center bg-white border w-full p-4 rounded-xl shadow-md animate-pulse motion-safe:animate-smooth-pulse"
                                        >
                                            <div className="bg-gray-200 w-32 h-32 rounded-xl mb-4"></div> {/* Skeleton Image */}
                                            <div className="bg-gray-200 w-32 h-6 mb-2"></div> {/* Skeleton Title */}
                                            <div className="bg-gray-200 w-48 h-4"></div> {/* Skeleton Description */}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                data && data.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 justify-items-center text-wrap">
                                        {data.map((item: any) => (
                                            <div
                                                key={item.id}
                                                className="flex flex-col items-center bg-white border w-full p-4 rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer"
                                                onClick={() => handleClick(item.id)} // Navigate to dynamic page on click
                                            >
                                                <h2 className="text-center font-semibold text-lg">{item.title}</h2>
                                                <Image
                                                    width={200}
                                                    height={200}
                                                    src={item.image}
                                                    alt="Result Image"
                                                    className="rounded-xl shadow-lg mt-2 w-auto h-auto"
                                                />
                                                <p className="text-center mt-2">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center">No results found</p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Content>
            <Footer />
        </>
    );
}
