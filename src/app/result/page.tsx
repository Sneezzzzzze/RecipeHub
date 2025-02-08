'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // useRouter from App Router
import Header from '@/app/ui/components/navbar';
import Footer from "@/app/ui/components/footer";
import Image from "next/image";

export default function Result() {
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        // Retrieve the data from sessionStorage
        const storedData = sessionStorage.getItem('searchData');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    const handleClick = (uuid: string) => {
        // Automatically navigate to the dynamic result page based on `uuid`
        router.push(`/result/${uuid}`);
    };

    return (
        <>
            <Header/>
            <div className="flex flex-col items-center justify-center bg-white py-8">
                <div className="shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 bg-white rounded-xl w-full max-w-screen-xl">
                    <div className="flex flex-col items-center bg-white border p-4 rounded-xl shadow-md">
                        <h1 className="text-center p-1 text-xl font-bold">Search Results</h1>
                        {data && data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 justify-items-center text-wrap">
                                {data.map((item:any) => (
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
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}