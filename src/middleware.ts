import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware"; // Import the fixed function

export async function middleware(req: NextRequest) {
    console.log("🔍 Middleware triggered for:", req.nextUrl.pathname); // Log when middleware runs

    const { supabase, supabaseResponse } = createClient(req);

    const { data: { session }, error } = await supabase.auth.getSession();

    console.log("🔍 Auth Debug: Session:", session);

    if (!session?.user) {
        console.log("🚨 No user session, redirecting to /login");
        return NextResponse.redirect(new URL("/auth/signin", req.nextUrl.origin));
    }

    return supabaseResponse;
}

export const config = {
    matcher: ["/profile"], // Match all routes
};
