import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware"; // Import the fixed function

export async function middleware(req: NextRequest) {

    const { supabase, supabaseResponse } = createClient(req);

    const { data: { session }, error } = await supabase.auth.getSession();


    if (!session?.user) {
        return NextResponse.redirect(new URL("/auth/signin", req.nextUrl.origin));
    }

    return supabaseResponse;
}

export const config = {
    matcher: ["/profile"], // Match all routes
};
