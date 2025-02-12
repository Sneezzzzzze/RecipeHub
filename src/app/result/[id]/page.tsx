'use client';

import {useParams} from 'next/navigation';  // For getting dynamic params from the URL
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Content from "@/app/ui/components/content";
import Footer from "@/app/ui/components/footer";

export default function ResultDetail() {
    const {id} = useParams();  // Get `id` from URL
    const [ingredient, setIngredient] = useState<any>(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Check if `id` is available
        if (!id) return;

        // Retrieve the stored data from sessionStorage
        const storedData = sessionStorage.getItem('searchData');
        if (storedData) {
            setIngredient(JSON.parse(storedData));
        }
        console.log("Ingredient Data:", storedData); // Debugging
        // Simulate loading state delay (optional)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        import("@clayui/css/lib/css/atlas.css");
    }, [id]);

    return (
        <>
            <Content>
                {ingredient ? (
                    <div className="flex top-0 items-center justify-center">
                        <div className="shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 bg-white rounded-xl w-full max-w-screen-xl">
                            <div className="flex flex-col items-center bg-white border p-4 rounded-xl shadow-md">
                                <h1 className="text-center p-1 text-xl font-bold">Ingredient Details {ingredient.id}</h1>
                                {ingredient && ingredient.length > 0 ? (
                                    <div className="">
                                        {ingredient.map(
                                            (item: any) => (
                                                // Check if item id matches id
                                                item.id == id && (
                                                    <div key={item.id}>
                                                        {/* Combined Missed & Used Ingredients Grid */}
                                                        {item.missedIngredients && item.missedIngredients.length > 0 || item.usedIngredients && item.usedIngredients.length > 0 ? (
                                                            loading ? (
                                                                // Create a skeleton based on the length of `missedIngredients` + `usedIngredients`
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 justify-items-center text-wrap">
                                                                    {[...Array(item.missedIngredients.length + item.usedIngredients.length)].map((_, index) => (
                                                                        <div key={index} className="flex flex-col items-center bg-gray-300 animate-pulse w-full p-4 rounded-xl shadow-md">
                                                                            <div className="bg-gray-200 w-32 h-32 rounded-xl mb-4"></div> {/* Skeleton Image */}
                                                                            <div className="bg-gray-200 w-32 h-6 mb-2"></div> {/* Skeleton Title */}
                                                                            <div className="bg-gray-200 w-48 h-4"></div> {/* Skeleton Description */}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 justify-items-center text-wrap">
                                                                    {/* Combine missedIngredients and usedIngredients into one array */}
                                                                    {[...item.missedIngredients, ...item.usedIngredients].map((ingredient, index) => (
                                                                        <div key={index} className="flex flex-col items-center bg-white border w-full p-4 rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer">
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
                                                            )
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
            </Content>
            <Footer />
        </>
    );
}
