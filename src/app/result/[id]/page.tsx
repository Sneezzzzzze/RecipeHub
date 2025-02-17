'use client';

import { useParams } from 'next/navigation';  // For getting dynamic params from the URL
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Footer from "@/app/ui/components/footer";
import Navbar from "@/app/ui/components/navbar";

export default function ResultDetail() {
    const { id } = useParams();  // Get `id` from URL
    const [ingredient, setIngredient] = useState<any>(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [view, setView] = useState('ingredients'); // Default view
    useEffect(() => {
        // Check if `id` is available
        if (!id) return;
        const query = new URLSearchParams(window.location.search);
        setView(query.get('view') || 'ingredients'); // Set view based on query param

        // Retrieve the stored data from sessionStorage
        const storedData = sessionStorage.getItem('searchData');
        if (storedData) {
            setIngredient(JSON.parse(storedData));
        } else {
            const guestStoredData = localStorage.getItem("guest_searchData");
            if (guestStoredData) {
                setIngredient(JSON.parse(guestStoredData));
            }
        }

        // Simulate loading state delay (optional)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        import("@clayui/css/lib/css/atlas.css");
    }, [id]);

    return (
        <>
            <Navbar />
            <div
                className="flex w-full h-[150px] items-center justify-center relative"
                style={{
                    backgroundImage: `url("/image-header.png")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}></div>

            {/* Content Section */}
            {view === 'ingredients'?(
                <div className="flex flex-col lg:flex-row justify-center items-start w-full max-w-screen-xl mx-auto gap-6 p-6">
                    {/* Left Column - Ingredient Details */}
                    <div className="w-full lg:w-2/3">
                        <h1 className="text-2xl font-bold mb-4">Ingredient Details</h1>

                        {ingredient ? (
                            <div>
                                {ingredient.map((item: any) => (
                                    // Check if item id matches id
                                    item.id == id && (
                                        <div key={item.id}>
                                            {/* Combined Missed & Used Ingredients Grid */}
                                            {item.missedIngredients && item.missedIngredients.length > 0 || item.usedIngredients && item.usedIngredients.length > 0 ? (
                                                loading ? (
                                                    // Skeleton Loader
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                        {[...Array(item.missedIngredients.length + item.usedIngredients.length)].map((_, index) => (
                                                            <div key={index} className="relative bg-gray-200 animate-pulse rounded-xl h-56">
                                                                {/* Skeleton Image */}
                                                                <div className="bg-gray-300 w-100 h-32 rounded-xl mb-4 mx-auto"></div>
                                                                {/* Skeleton Title */}
                                                                <div className="bg-gray-300 w-60 h-6 mb-2 mx-auto"></div>
                                                                <div className="bg-gray-300 w-48 h-4 mb-2 mx-auto"></div> {/* Skeleton Description */}

                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                        {/* Combine missedIngredients and usedIngredients into one array */}
                                                        {[...item.missedIngredients, ...item.usedIngredients].map((ingredient, index) => (
                                                            <div key={index} className="relative bg-white border-2 border-[#FDE047] shadow-[4px_4px_#F59E0B] rounded-xl overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                                                                <Image
                                                                    width={100}
                                                                    height={100}
                                                                    src={ingredient.image}
                                                                    alt={ingredient.name}
                                                                    className="w-40 h-40 object-cover"
                                                                />
                                                                <div className="p-3">
                                                                    <h2 className="text-lg font-bold">{ingredient.name}</h2>
                                                                    <p className="text-sm text-gray-500">{ingredient.original || 'No description available'}</p>
                                                                </div>
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
                            <p className="text-center">Loading...</p>
                        )}
                    </div>
                </div>
            ) : (
                <div>no no</div>
                )
            }
            <Footer />
        </>
    );
}
