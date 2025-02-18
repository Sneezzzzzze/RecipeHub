import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Missing recipe id" }, { status: 400 });
    }

    const apiKey = process.env.SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`; // Fixed the double slashes in the URL

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return NextResponse.json({ error: `API error: ${response.statusText}` }, { status: response.status });
        }

        const data = await response.json();

        // Ensure correct format and return ingredients data
        return NextResponse.json({ ingredients: data.ingredients ?? [] }); // Using ingredients here instead of equipment
    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    }
}
