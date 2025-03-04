'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import Navbar from '@/app/ui/components/navbar';
import Footer from "@/app/ui/components/footer";
import { GoDotFill } from "react-icons/go";

export default function Docs() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const cuisines = [
        "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese",
        "Eastern European", "European", "French", "German", "Greek", "Indian",
        "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American",
        "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern",
        "Spanish", "Thai", "Vietnamese"
    ];
    const mealType = [
        "main course", "side dish", "dessert", "appetizer", "salad", "bread"
        ,"breakfast" ,"soup" ,"beverage" ,"sauce"
    ]
    const diet = [
        "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian",
        "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"
    ]

    const intolerances = [
        "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish"
        , "Soy", "Sulfite", "Tree Nut", "Wheat"
    ]

    useEffect(() => {
        import("@clayui/css/lib/css/atlas.css");

        const fetchUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    setUser(session.user);
                }
            } catch (error) {
                console.error("Error fetching user session:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-start w-full max-w-screen-xl mx-auto gap-4 p-4 sm:p-6">
                <div className="text-left w-full mx-auto">
                    <p className="text-left text-3xl sm:text-4xl md:text-5xl font-bold ">Docs</p>
                    <ul className="p-2 sm:p-4 list-none">
                        <li className="mb-8">
                            <p className="text-xl sm:text-2xl font-semibold mb-2">Normal Mode:</p>
                            <p className="px-3 sm:px-4 text-sm sm:text-base mb-4">Search through thousands of recipes using advanced filtering and ranking</p>

                            <p className="text-lg sm:text-xl font-semibold px-2 sm:px-3 mb-2">Cuisine:</p>
                            <ul className="list-none columns-1 sm:columns-2 md:columns-3 px-3 sm:px-5 gap-4 mb-4">
                                {cuisines.map(cuisine => (
                                    <li key={cuisine} className="flex items-center mb-1 sm:mb-2">
                                        <GoDotFill className="mr-2 shrink-0 text-amber-500" />
                                        <span>{cuisine}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-lg sm:text-xl font-semibold px-2 sm:px-3 mb-2">Meal Type:</p>
                            <ul className="list-none columns-1 sm:columns-2 md:columns-3 px-3 sm:px-5 gap-4 mb-4">
                                {mealType.map(meal => (
                                    <li key={meal} className="flex items-center mb-1 sm:mb-2">
                                        <GoDotFill className="mr-2 shrink-0 text-amber-500" />
                                        <span>{meal}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-lg sm:text-xl font-semibold px-2 sm:px-3 mb-2">Diet:</p>
                            <ul className="list-none columns-1 sm:columns-2 md:columns-3 px-3 sm:px-5 gap-4 mb-4">
                                {diet.map(diets => (
                                    <li key={diets} className="flex items-center mb-1 sm:mb-2">
                                        <GoDotFill className="mr-2 shrink-0 text-amber-500" />
                                        <span>{diets}</span>
                                    </li>
                                ))}
                            </ul>
                            <Image className="mb-4" src="/diet-infographic.png" width={400} height={400} alt="diet"/>

                            <p className="text-lg sm:text-xl font-semibold px-2 sm:px-3 mb-2">Intolerances:</p>
                            <ul className="list-none columns-1 sm:columns-2 md:columns-3 px-3 sm:px-5 gap-4 mb-4">
                                {intolerances.map(Intolerances => (
                                    <li key={Intolerances} className="flex items-center mb-1 sm:mb-2">
                                        <GoDotFill className="mr-2 shrink-0 text-amber-500" />
                                        <span>{Intolerances}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="px-3 sm:px-4 text-sm sm:text-base mb-4">
                                Search the recipe that you want and choose Cuisine, Meal Type, Diet, Intolerances in the profile and you can turn on/off.
                            </p>
                            <p className="text-red-600 px-3 sm:px-4 text-sm sm:text-base mb-4">
                                IF YOU TYPE WRONG IT MIGHT SHOW "RESULT NOT FOUND"
                            </p>
                        </li>
                        <hr className="bg-[#FDE047] h-0.5 w-full my-4" />
                        <li className="mb-8">
                            <p className="text-xl sm:text-2xl font-semibold mb-2">Ingredient Mode:</p>
                            <p className="px-3 sm:px-4 text-sm sm:text-base mb-4">
                                Search the item by ingredient that you have and choose the amount that you want to search.
                            </p>
                            <p className="text-red-600 px-3 sm:px-4 text-sm sm:text-base mb-4">
                                IF YOU TYPE WRONG IT MIGHT SHOW "RESULT NOT FOUND"
                            </p>
                            <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 px-3 sm:px-4 mt-2">
                                <p className="mr-2 p-1 text-sm sm:text-base">ex.</p>
                                <p className="bg-gray-200 mr-2 p-1 rounded-lg text-sm sm:text-base">chicken</p>
                                <p className="bg-gray-200 mr-2 p-1 rounded-lg text-sm sm:text-base">3</p>
                            </div>
                        </li>

                        <hr className="bg-[#FDE047] h-0.5 w-full my-4" />

                        <li className="mb-8">
                            <p className="text-xl sm:text-2xl font-semibold mb-2">Random Mode:</p>
                            <p className="px-3 sm:px-4 text-sm sm:text-base mb-4">
                                Get a random recipe suggestion based on your preferences.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}