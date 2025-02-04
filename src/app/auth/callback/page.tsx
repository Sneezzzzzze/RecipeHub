"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

const Callback = () => {
    const router = useRouter();

    useEffect(() => {
        const handleSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Session retrieval error:", error.message);
            } else if (data?.session) {
                console.log("User logged in:", data.session.user);
                router.push("/");
            } else {
                router.push("/auth/login");
            }
        };

        handleSession();
    }, [router]);

    return <div className="text-center text-black">Logging in...</div>;
};

export default Callback;
