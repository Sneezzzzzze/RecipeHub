import { NextResponse } from 'next/server';
import {supabase} from "@/utils/supabase/client";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "pasta"; // Default to "pasta" if null
    const number = searchParams.get("number") || 1; // Default to 1 if null

    // Get the authenticated user's session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    // Fetch user preferences from the users table
    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("cuisine, meal_type, diet, intolerances")
        .eq("id", session?.user.id)
        .single();


    // Extract preferences, default to empty strings if null
    const preferences = {
        cuisine: userData?.cuisine || "",
        mealType: userData?.meal_type || "",
        diet: userData?.diet || "",
        intolerances: userData?.intolerances || "",
    };

    const apiKey = process.env.SPOONACULAR_API_KEY;
    if (!apiKey) {
        console.error("Spoonacular API Key is missing");
        return NextResponse.json({ error: "Spoonacular API key is missing" }, { status: 500 });
    }

    // Construct the API URL correctly
    let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}`;

    // Add preferences to the URL only if they are non-empty
    if (preferences.cuisine) apiUrl += `&cuisine=${encodeURIComponent(preferences.cuisine)}`;
    if (preferences.mealType) apiUrl += `&type=${encodeURIComponent(preferences.mealType)}`;
    if (preferences.diet) apiUrl += `&diet=${encodeURIComponent(preferences.diet)}`;
    if (preferences.intolerances) apiUrl += `&intolerances=${encodeURIComponent(preferences.intolerances)}`;
    apiUrl += `&number=${number}&apiKey=${apiKey}`
    // Make the API call
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Response:", { status: response.status, data }); // Debug response

        if (!response.ok) {
            console.error("Spoonacular API Error:", data);
            throw new Error(data.message || `Spoonacular API error: ${response.status}`);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
    }
}