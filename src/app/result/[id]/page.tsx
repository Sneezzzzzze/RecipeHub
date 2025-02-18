'use client';

import { useParams } from 'next/navigation';  // For getting dynamic params from the URL
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Footer from "@/app/ui/components/footer";
import Navbar from "@/app/ui/components/navbar";
import {supabase} from "@/utils/supabase/client";

interface Equipment {
    name: string;
    image: string;
}

export default function ResultDetail() {
    const { id } = useParams();  // Get `id` from URL
    const [ingredient, setIngredient] = useState<any>(null);
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [instruction, setInstruction] = useState<any>(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [view, setView] = useState('ingredients'); // Default view
    const [user, setUser] = useState<any>(null);
    const equipmentImgPath = 'https://img.spoonacular.com/equipment_100x100/'
    const ingredientImgPath = 'https://img.spoonacular.com/ingredients_100x100/'

    const instructionsto = async () => {
        const response = await fetch(`/api/analyzedInstructions?id=${id}`);
        const result = await response.json();

        // Ensure we extract the correct data
        if (result.steps && Array.isArray(result.steps)) {
            setInstruction(result.steps); // Store the steps in the state
            sessionStorage.setItem('instruction', JSON.stringify(result.steps));
        } else {
            console.error("Invalid response format:", result);
            setInstruction([]); // Fallback to an empty array
        }
    }

    const equipmentto = async () => {
        const response = await fetch(`/api/equipmentById?id=${id}`);
        const result = await response.json();

        // Ensure we extract the correct data
        if (result.equipment && Array.isArray(result.equipment)) {
            setEquipment(result.equipment); // Use result.equipment instead of result
        } else {
            console.error("Invalid response format:", result);
            setEquipment([]); // Fallback to an empty array
        }
    };

    const ingredientsto = async () => {
        const response = await fetch(`/api/ingredientById?id=${id}`);
        const result = await response.json();

        // Ensure we extract the correct data
        if (result.ingredients && Array.isArray(result.ingredients)) {
            setIngredient(result.ingredients); // Store the ingredients in the state
        } else {
            console.error("Invalid response format:", result);
            setIngredient([]); // Fallback to an empty array
        }
    }



    useEffect(() => {
        import("@clayui/css/lib/css/atlas.css");
        const fetchUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    setUser(session.user);
                    // Get user-specific search data from sessionStorage
                    const storedData = sessionStorage.getItem(`${session.user.user_metadata?.sub}_searchData`);
                    // setIngredient(storedData ? JSON.parse(storedData) : []);
                } else {
                    // Get guest search data from localStorage
                    const guestData = localStorage.getItem("guest_searchData");
                    // setIngredient(guestData ? JSON.parse(guestData) : []);
                }
                if (ingredient === null) {
                    setUser([]);
                }
            } catch (error) {
                console.error("Error fetching user session:", error);
            } finally {
                setTimeout(() => setLoading(false), 1000);
            }
        };
        // Check if `id` is available
        if (!id) return;
        const query = new URLSearchParams(window.location.search);
        setView(query.get('view') || 'ingredients'); // Set view based on query param

        // Simulate loading state delay (optional)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        fetchUser();
    }, [id]);

    useEffect(() => {
        instructionsto();
        equipmentto();
        ingredientsto();
    }, []);

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

                        {ingredient && ingredient.length > 0 ? (
                            <div>
                                {/* Display all ingredients */}
                                {loading ? (
                                    // Skeleton Loader
                                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                                        {[...Array(ingredient.length)].map((_, index) => (
                                            <div key={index} className="relative bg-gray-200 animate-pulse rounded-xl h-56">
                                                {/* Skeleton Image */}
                                                <div className="bg-gray-300 w-100 h-32 rounded-xl mb-4 mx-auto"></div>
                                                <div className="bg-gray-300 w-60 h-6 mb-2 mx-auto"></div>
                                                <div className="bg-gray-300 w-48 h-4 mb-2 mx-auto"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                                        {/* Map through all ingredients */}
                                        {ingredient.map((item: any) => (
                                            <div key={item.name} className="relative bg-white border-2 border-[#FDE047] shadow-[4px_4px_#F59E0B] rounded-xl overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={ingredientImgPath + item.image}
                                                    alt={item.name}
                                                    className="w-40 h-40 object-cover"
                                                />
                                                <div className="p-3">
                                                    <h2 className="text-lg font-bold">{item.name}</h2>
                                                    {/* Display amount and unit */}
                                                    <p className="text-sm text-gray-500">
                                                        {item.amount?.metric.value} {item.amount?.metric.unit || 'units'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>No ingredients available</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row justify-center items-start w-full max-w-screen-xl mx-auto gap-6 p-6">
                    {/* Left Side: How to Make */}
                    <div className="w-full lg:w-2/3">
                        <h1 className="text-2xl font-bold mb-4">How to Make</h1>
                        {instruction && instruction.length > 0 ? (
                            instruction.map((step:any, index:any) => (
                                <div key={index} className="step">
                                    <p>{index + 1}. {step.step}</p> {/* Access the step here */}
                                </div>
                            ))
                        ) : (
                            <p>Not have instructions...</p> // Show loading text if instructions are empty
                        )}
                    </div>

                    {/* Right Side: Equipment */}
                    <div className="w-full lg:w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Equipment</h2>
                        <div className="flex flex-col gap-4 mt-4">

                            {equipment && equipment.length > 0 ? (
                                equipment.map((item, index) => (
                                <div key={index} className="flex items-center bg-white border-2 border-yellow-300 rounded-lg shadow-md p-2">
                                    <Image width={100} height={80} src={equipmentImgPath+item.image} alt={item.name} className="w-auto h-auto object-cover rounded-lg" />
                                    <div className="ml-4">
                                        <h3 className="font-semibold">{item.name}</h3>
                                    </div>
                                </div>
                                )
                                )
                            ) : (
                                <p>Not have equipments...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
