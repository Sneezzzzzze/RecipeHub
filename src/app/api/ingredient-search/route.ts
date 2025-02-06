import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const number:string | number = searchParams.get("number") || 1;

    if (!name) {
        return NextResponse.json({ error: "Missing ingredient name" }, { status: 400 });
    }

    const apiKey = process.env.SPOONACULAR_API_KEY;
    const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${name}&number=${number}&apiKey=${apiKey}`
        );
    const data = await response.json();

    return NextResponse.json(data);
}
