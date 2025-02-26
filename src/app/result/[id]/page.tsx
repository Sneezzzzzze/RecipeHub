'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Footer from '@/app/ui/components/footer';
import Navbar from '@/app/ui/components/navbar';
import { supabase } from '@/utils/supabase/client';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Equipment {
    name: string;
    image: string;
}

export default function ResultDetail() {
    const { id } = useParams(); // Get `id` from URL
    const { name } = useParams(); // Get `name` from URL
    const [ingredient, setIngredient] = useState<any[]>([]);
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [instruction, setInstruction] = useState<any[]>([]);
    const [nutrition, setNutrition] = useState<any>(null);
    const [recipeName, setRecipeName] = useState<string | null>(null); // New state for recipe name
    const [loading, setLoading] = useState(true); // Loading state
    const [view, setView] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    const equipmentImgPath = 'https://img.spoonacular.com/equipment_100x100/';
    const ingredientImgPath = 'https://img.spoonacular.com/ingredients_100x100/';

    // Fetch user session
    useEffect(() => {
        import('@clayui/css/lib/css/atlas.css');
        const fetchUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user || null);
            } catch (error) {
                console.error('Error fetching user session:', error);
            }
        };

        if (!id) return;
        const query = new URLSearchParams(window.location.search);
        setView(query.get('view'));
        setRecipeName(query.get('name') || null);
        fetchUser();
    }, [id]);

    // Fetch data based on the view
    useEffect(() => {
        if (!view || !id) return;

        setLoading(true); // Start loading

        const fetchData = async () => {
            try {
                if (view === 'ingredients') {
                    const response = await fetch(`/api/ingredientById?id=${id}`);
                    const result = await response.json();
                    console.log(result)
                    setIngredient(Array.isArray(result.ingredients) ? result.ingredients : []);
                    setLoading(false); // Stop loading when fetch completes
                } else if (view === 'how-to-make') {
                    const [instructionResponse, equipmentResponse] = await Promise.all([
                        fetch(`/api/analyzedInstructions?id=${id}`),
                        fetch(`/api/equipmentById?id=${id}`),
                    ]);
                    const instructionResult = await instructionResponse.json();
                    const equipmentResult = await equipmentResponse.json();
                    setInstruction(Array.isArray(instructionResult.steps) ? instructionResult.steps : []);
                    setEquipment(Array.isArray(equipmentResult.equipment) ? equipmentResult.equipment : []);
                    setLoading(false); // Stop loading when fetch completes
                } else if (view === 'nutrition') {
                    const response = await fetch(`/api/nutrition?id=${id}`);
                    const data = await response.json();
                    setNutrition(data || null);
                    setLoading(false); // Stop loading when fetch completes
                }
            } catch (error) {
                console.error(`Error fetching ${view} data:`, error);
            } finally {
            }
        };

        fetchData();
    }, [view, id]);

    // Skeleton Component for Equipment/Ingredients (Cards)
    const SkeletonCard = () => (
        <div className="bg-gray-300 animate-pulse rounded-lg h-40 w-full border border-yellow-300"></div>
    );


    // Skeleton Component for Instructions (List Items)
    const SkeletonListItem = () => (
        <div className="bg-gray-200 animate-pulse h-10 rounded"></div>
    );

    return (
        <>
            <Navbar />
            {/* Content Section */}
            {view === 'ingredients' ? (
                <div className="flex flex-col lg:flex-row justify-center items-start w-full max-w-screen-xl mx-auto gap-6 p-6">
                    <div className="w-full lg:w-2/3">
                        <h1 className="text-2xl font-bold mb-4">Ingredient Details</h1>
                        {loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                                {[...Array(ingredient.length || 6)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        ) : ingredient.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                                {Array.from(
                                    new Map(
                                        ingredient
                                            .map((item) => [item.name, item]) // Map to [name, item] pairs
                                    ).values() // Get unique items by name
                                ).map((item) => (
                                    <div
                                        key={item.name}
                                        className="relative bg-white border-2 border-[#FDE047] shadow-[4px_4px_#F59E0B] rounded-xl overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                                    >
                                        <Image
                                            width={100}
                                            height={100}
                                            src={item.image && item.image !== "no.jpg" ? `${ingredientImgPath}${item.image}` : "/no.png"}
                                            alt={item.name}
                                            className="w-40 h-40 object-cover"
                                            onError={(e) => (e.currentTarget.src = "/no.png")} // Fallback if image fails
                                        />
                                        <div className="p-3">
                                            <h2 className="text-lg font-bold">{item.name}</h2>
                                            <p className="text-sm text-gray-500">
                                                {item.amount?.metric.value} {item.amount?.metric.unit || 'units'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No ingredients available</p>
                        )}
                    </div>
                </div>
            ) : view === 'how-to-make' ? (
                <div className="flex flex-col justify-center items-center w-full max-w-screen-xl mx-auto p-6 bg-white">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-3 text-gray-800">How to make {recipeName}</h1>
                    </div>
                    <p className="text-center text-gray-600 mb-4 max-w-2xl">
                        Master the art of making the perfect {recipeName} with these simple steps. Follow along to create a delicious, restaurant-quality {recipeName} at home.
                    </p>
                    <hr className="bg-[#FDE047] h-0.5 w-30 my-4" />

                    {/* Step 1: Prepare Your Equipment */}
                    <div className="mb-10 w-full">
                        <h2 className="text-2xl font-semibold mb-4 flex">
                            <span className="bg-[#FDE047] shadow-[4px_4px_#F59E0B] text-black rounded-full w-8 h-8 flex justify-center mr-2">1</span>
                            Prepare Your Equipment
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                            {loading ? (
                                <>
                                    {[...Array(equipment.length || 3)].map((_, i) => (
                                        <SkeletonCard key={i} />
                                    ))}
                                </>
                            ) : equipment.length > 0 ? (
                                equipment.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border-2 border-yellow-300 rounded-lg shadow-md p-2 flex items-center"
                                    >
                                        <Image
                                            width={100}
                                            height={80}
                                            src={equipmentImgPath + item.image}
                                            alt={item.name}
                                            className="w-32 h-32 object-cover rounded-lg"
                                        />
                                        <div className="ml-4">
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center w-full">No equipment available...</p>
                            )}
                        </div>
                    </div>

                    {/* Step 2: Just Do It */}
                    <div className="mb-10 w-full">
                        <h2 className="text-2xl font-semibold mb-4 flex">
                            <span className="bg-[#FDE047] shadow-[4px_4px_#F59E0B] text-black rounded-full w-8 h-8 flex justify-center mr-2">2</span>
                            Just Do It
                        </h2>
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(instruction.length || 3)].map((_, i) => (
                                    <SkeletonListItem key={i} />
                                ))}
                            </div>
                        ) : instruction.length > 0 ? (
                            <ul className="list-disc pl-4 text-gray-700 w-full">
                                {instruction.map((step, index) => (
                                    <p key={index} className="text-lg">
                                        {index + 1}. {step.step}
                                    </p>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-center">No instructions available...</p>
                        )}
                    </div>
                </div>
            ) : view === 'nutrition' ? (
                <div className="flex justify-center items-start w-full max-w-screen-xl mx-auto gap-6 p-6">
                    <div className="w-full lg:w-2/3">
                        <h1 className="text-2xl font-bold mb-4">Nutrition Facts</h1>
                        {loading ? (
                            <div className="bg-gray-300 animate-pulse rounded-lg h-[400px] w-full"></div>
                        ) : nutrition && nutrition.nutrients?.length > 0 ? (
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <Bar
                                    data={{
                                        labels: nutrition.nutrients.map((nutrient: any) =>
                                            `${nutrient.name} ${nutrient.unit || ''}`.trim()
                                        ),
                                        datasets: [
                                            {
                                                label: 'Nutrient Amount',
                                                data: nutrition.nutrients.map((nutrient: any) => nutrient.amount),
                                                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                                                borderColor: 'rgba(255, 159, 64, 1)',
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            title: {
                                                display: true,
                                                text: 'Nutrition Facts',
                                                font: {
                                                    size: 18,
                                                },
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: (context: any) => {
                                                        const label = context.label || '';
                                                        const value = context.raw || 0;
                                                        const nutrient = nutrition?.nutrients?.find((n: any) => `${n.name} ${n.unit || ''}`.trim() === label);
                                                        const unit = nutrient?.unit || '';
                                                        return `${label}: ${value} ${unit}`;
                                                    },
                                                },
                                            },
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                title: {
                                                    display: true,
                                                    text: 'Amount',
                                                },
                                            },
                                            x: {
                                                title: {
                                                    display: true,
                                                    text: 'Nutrients',
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        ) : (
                            <p>No nutrition data available.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-center text-lg font-bold">Invalid view selected</p>
            )}

            <Footer />
        </>
    );
}