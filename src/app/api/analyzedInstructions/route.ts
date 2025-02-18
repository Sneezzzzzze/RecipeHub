import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Missing ingredient id" }, { status: 400 });
    }

    const apiKey = process.env.SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return NextResponse.json({ error: `API error: ${response.statusText}` }, { status: response.status });
        }

        const data = await response.json();

        // Ensure correct format, returning steps instead of equipment
        return NextResponse.json({ steps: data[0]?.steps ?? [] }); // Adjust to access the first recipe's steps
    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    }
}
