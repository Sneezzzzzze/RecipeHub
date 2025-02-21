import { NextResponse } from "next/server";

const API_KEY = process.env.SPOONACULAR_API_KEY; // Your Spoonacular API key

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Get the recipe ID from query params

    if (!id) {
        return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching nutrition data" }, { status: 500 });
    }
}
