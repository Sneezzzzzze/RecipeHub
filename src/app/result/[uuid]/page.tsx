'use client';

import {useParams} from 'next/navigation';  // For getting dynamic params from the URL
import {useEffect, useState} from 'react';
import Image from "next/image";
import Header from "@/app/ui/components/navbar";

export default function ResultDetail() {
    const {uuid} = useParams();  // Get `uuid` from URL
    const [ingredient, setIngredient] = useState<any>(null);

    useEffect(() => {
        // Check if `uuid` is available
        if (!uuid) return;

        // Retrieve the stored data from sessionStorage
        const storedData = sessionStorage.getItem('searchData');
        if (storedData) {
            setIngredient(JSON.parse(storedData));
        }
        console.log("Ingredient Data:", storedData); // Debugging
    }, [uuid]);

    return (
        <>
            <Header/>
            {ingredient ? (
                <div className="flex flex-col items-center justify-center bg-white py-8">
                    <div className="shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 bg-white rounded-xl w-full max-w-screen-xl">
                        <div className="flex flex-col items-center bg-white border p-4 rounded-xl shadow-md">
                            <h1 className="text-center p-1 text-xl font-bold">Ingredient Details {ingredient.id}</h1>
                            {ingredient && ingredient.length > 0 ? (
                                <div className="">
                                    {ingredient.map(
                                        (item:any) => (
                                            // Check if item id matches uuid
                                            item.id == uuid && (
                                                <div key={item.id}
                                                     className="">
                                                    {/* Combined Missed & Used Ingredients Grid */}
                                                    {item.missedIngredients && item.missedIngredients.length > 0 || item.usedIngredients && item.usedIngredients.length > 0 ? (
                                                        <div
                                                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 justify-items-center text-wrap">
                                                            {/* Combine missedIngredients and usedIngredients into one array */}
                                                            {[...item.missedIngredients, ...item.usedIngredients].map((ingredient, index) => (
                                                                <div key={index}
                                                                     className="flex flex-col items-center bg-white border w-full p-4 rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer">
                                                                    <h2 className="text-center font-semibold text-lg">{ingredient.name}</h2>
                                                                    <Image
                                                                        width={200}
                                                                        height={200}
                                                                        src={ingredient.image}
                                                                        alt={ingredient.name}
                                                                        className="rounded-xl shadow-lg mt-2 w-auto h-auto"
                                                                        priority={true}
                                                                    />
                                                                    <p className="text-center mt-2">{ingredient.original || 'No description available'}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p>No ingredients available</p>
                                                    )}
                                                </div>
                                            )
                                        ))}
                                </div>
                            ) : (
                                <p className="text-center">No results found</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading...</p>
            )}
        </>
    );
}
