import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const number:string | number = searchParams.get("number") || 1;

    const apiKey = process.env.SPOONACULAR_API_KEY;
    const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${apiKey}`
    );
    const data = await response.json();

    return NextResponse.json(data);
}
